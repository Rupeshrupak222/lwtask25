from PIL import Image, ImageDraw
import numpy as np
import matplotlib.pyplot as plt

width, height = 400, 400
img = Image.new("RGB", (width, height), color=(255, 255, 255))
draw = ImageDraw.Draw(img)


n = 8
radius = 20
for i in range(n):
    for j in range(n):
        x = int((i + 0.5) * width / n)
        y = int((j + 0.5) * height / n)
        fill = (
            int(255 * i / n),
            int(255 * j / n),
            150
        )
        draw.ellipse((x-radius, y-radius, x+radius, y+radius), fill=fill)

noise = (np.random.rand(height, width, 3) * 50).astype(np.uint8)
img_np = np.array(img)
img_np = np.clip(img_np + noise, 0, 255).astype(np.uint8)
img = Image.fromarray(img_np)

plt.figure(figsize=(5,5))
plt.imshow(img)
plt.axis('off')
plt.show()

img.save("my_digital_art.png")
print("Image saved as my_digital_art.png")