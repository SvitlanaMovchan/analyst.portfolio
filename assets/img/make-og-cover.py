"""Generate the 1200x630 link-preview cover for LinkedIn / Telegram."""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (255, 255, 255)
TEXT = (15, 23, 42)
MUTED = (100, 116, 139)
ACCENT = (37, 99, 235)

NAME = "Svitlana Movchan"
ROLE = "Data Analyst"
SKILLS = "SQL  ·  Python  ·  Power BI  ·  Tableau  ·  GA4"

FONTS = {
    "bold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "reg": "/System/Library/Fonts/Supplemental/Arial.ttf",
    "mono": "/System/Library/Fonts/Menlo.ttc",
}


def font(kind, size):
    try:
        return ImageFont.truetype(FONTS[kind], size)
    except OSError:
        return ImageFont.load_default(size)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# accent rule along the top
d.rectangle([0, 0, W, 8], fill=ACCENT)

# text block
d.text((88, 196), NAME, font=font("bold", 76), fill=TEXT)
d.text((90, 300), ROLE, font=font("mono", 32), fill=MUTED)
d.text((88, 392), SKILLS, font=font("reg", 27), fill=MUTED)

# small progress-bar motif under the text
d.rounded_rectangle([88, 470, 328, 480], radius=5, fill=(206, 220, 250))
d.rounded_rectangle([88, 470, 208, 480], radius=5, fill=ACCENT)

# bar-chart motif, bottom right
bars = [(956, 380, 36, 90, 0.35), (1006, 330, 36, 140, 0.6), (1056, 260, 36, 210, 1.0)]
for x, y, w, h, alpha in bars:
    fill = tuple(int(c * alpha + 255 * (1 - alpha)) for c in ACCENT)
    d.rounded_rectangle([x, y, x + w, y + h], radius=6, fill=fill)

out = "/Users/olexandrmovchan/analyst.portfolio/assets/img/og-cover.png"
img.save(out, "PNG", optimize=True)
print("wrote", out, img.size)
