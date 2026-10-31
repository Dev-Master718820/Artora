"""Development-only downloader. All downloaded assets are checked before use."""
import subprocess,json,concurrent.futures,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
def get(url):
 p=subprocess.run(['curl','-fLsS','--retry','1','--connect-timeout','12','--max-time','40',url],capture_output=True)
 return p.stdout if p.returncode==0 else b''
def save(rel,url):
 data=get(url)
 if len(data)>2000 and (data[:2]==b'\xff\xd8' or data[:4]==b'\x89PNG' or data[:4]==b'RIFF'):
  (ROOT/'public/images'/rel).write_bytes(data);print('Saved',rel,len(data),flush=True);return True
 print('Unavailable',rel,flush=True);return False
jobs=[
 ('masters/mona-lisa.jpg','https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg'),
 ('masters/starry-night.jpg','https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg'),
 ('masters/pearl-earring.jpg','https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg'),
 ('masters/great-wave.jpg','https://upload.wikimedia.org/wikipedia/commons/0/0a/The_Great_Wave_off_Kanagawa.jpg'),
 ('masters/night-watch.jpg','https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg/1280px-The_Nightwatch_by_Rembrandt_-_Rijksmuseum.jpg'),
 ('masters/birth-of-venus.jpg','https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg'),
 ('masters/leonardo.jpg','https://upload.wikimedia.org/wikipedia/commons/b/ba/Leonardo_self.jpg'),
 ('artists/emma.jpg','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/olivia.jpg','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/daniel.jpg','https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/sophie.jpg','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/james.jpg','https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/amelia.jpg','https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/ethan.jpg','https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('artists/charlotte.jpg','https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=450&fit=crop&crop=faces&q=85'),
 ('banners/studio.jpg','https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1400&q=85'),
 ('banners/academy.jpg','https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1400&q=85'),
 ('banners/brushes.jpg','https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=85'),
]
with concurrent.futures.ThreadPoolExecutor(max_workers=7) as pool:list(pool.map(lambda j:save(*j),jobs))
# Art Institute of Chicago Open Access: download only records marked public domain.
records=[(16568,'masters/water-lilies.jpg'),(28560,'masters/bedroom.jpg')]
manifest=[]
def museum(j):
 ident,rel=j
 try:
  r=json.loads(get(f'https://api.artic.edu/api/v1/artworks/{ident}?fields=id,title,artist_title,image_id,is_public_domain'))['data']
  if not r['is_public_domain'] or not r['image_id']:return
  url=f"https://www.artic.edu/iiif/2/{r['image_id']}/full/1000,/0/default.jpg"
  if save(rel,url):manifest.append(dict(path='/images/'+rel,title=r['title'],artist=r['artist_title'],source=f'https://www.artic.edu/artworks/{ident}',license='CC0',url=url))
 except Exception as e:print('Museum asset unavailable',ident,str(e)[:80],flush=True)
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(museum,records))
(ROOT/'public/images/open-access-sources.json').write_text(json.dumps(manifest,indent=2))
