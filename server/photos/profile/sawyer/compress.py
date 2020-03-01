import os
from PIL import Image, ExifTags


for name in os.listdir('./original'):
    if not name.lower().endswith('.jpg'):
        continue;
        
    image = Image.open('original/' + name)

    # next 3 lines strip exif
    data = list(image.getdata())
    newimg = Image.new(image.mode, image.size)
    newimg.putdata(data)
    newimg = newimg.resize((int(image.size[0] / 2), int(image.size[1] / 2)))
    
    for orientation in ExifTags.TAGS.keys():
        if ExifTags.TAGS[orientation]=='Orientation':
            break
            
    try:
        exif=dict(image._getexif().items())

        if exif[orientation] == 3:
            newimg=newimg.rotate(180, expand=True)
        elif exif[orientation] == 6:
            newimg=newimg.rotate(270, expand=True)
        elif exif[orientation] == 8:
            newimg=newimg.rotate(90, expand=True)
    except AttributeError:
        print('No EXIF: ' + name)
        
    newimg.save(name)
    
    print(name)

print('\nDONE')