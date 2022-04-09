from PIL import Image
import pillow_heif

for i in range(1,156,1):
    try:
        heif_file = pillow_heif.read_heif(str(i)+".HEIC")
    except ValueError:
        continue
    image = Image.frombytes(
        heif_file.mode,
        heif_file.size,
        heif_file.data,
        "raw",
    
    )

    image.save("./jpgs/"+str(i)+".jpg", format("jpg"))