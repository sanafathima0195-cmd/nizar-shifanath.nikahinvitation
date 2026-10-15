import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_wedding_poster(photo_choice="bride"):
    # Poster canvas: 1200 x 1800 (2:3 luxury portrait ratio, 300 DPI friendly)
    width = 1200
    height = 1800
    
    # Base background: warm luxury cream / ivory
    img = Image.new("RGB", (width, height), "#fbf8f2")
    draw = ImageDraw.Draw(img)
    
    # 1. Subtle decorative gradient & background tone
    for y in range(height):
        # Soft subtle warm vignette
        ratio = y / height
        r = int(251 - ratio * 6)
        g = int(248 - ratio * 8)
        b = int(242 - ratio * 10)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
        
    # 2. Ornate Double Gold Arch Borders
    # Outer margin: 40px, Inner margin: 55px
    gold_outer = "#c8a581"
    gold_inner = "#deb887"
    gold_accent = "#8c6239"
    sage_green = "#4e5c46"
    charcoal = "#222a22"
    
    draw.rectangle([35, 35, width - 35, height - 35], outline=gold_outer, width=3)
    draw.rectangle([48, 48, width - 48, height - 48], outline="#e5d2be", width=1)
    draw.rectangle([54, 54, width - 54, height - 54], outline=gold_outer, width=1)
    
    # Corner ornamental diamonds
    def draw_diamond(cx, cy, size, color):
        points = [(cx, cy - size), (cx + size, cy), (cx, cy + size), (cx - size, cy)]
        draw.polygon(points, fill=color)

    draw_diamond(35, 35, 8, gold_accent)
    draw_diamond(width - 35, 35, 8, gold_accent)
    draw_diamond(35, height - 35, 8, gold_accent)
    draw_diamond(width - 35, height - 35, 8, gold_accent)
    
    # Fonts loading
    try:
        f_georgia_bold = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
        f_georgia_italic = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"
        f_georgia = "/System/Library/Fonts/Supplemental/Georgia.ttf"
        f_times = "/System/Library/Fonts/Supplemental/Times New Roman.ttf"
        f_times_bold = "/System/Library/Fonts/Supplemental/Times New Roman Bold.ttf"
        
        font_bismillah = ImageFont.truetype(f_georgia, 28)
        font_sub = ImageFont.truetype(f_georgia_italic, 24)
        font_parents = ImageFont.truetype(f_georgia, 23)
        font_invite = ImageFont.truetype(f_georgia_italic, 22)
        font_names = ImageFont.truetype(f_georgia_bold, 54)
        font_amp = ImageFont.truetype(f_georgia_italic, 46)
        font_lineage = ImageFont.truetype(f_georgia_italic, 20)
        font_date_huge = ImageFont.truetype(f_georgia_bold, 34)
        font_venue_title = ImageFont.truetype(f_georgia_bold, 24)
        font_venue_sub = ImageFont.truetype(f_georgia, 21)
        font_tagline = ImageFont.truetype(f_georgia_italic, 20)
    except Exception as e:
        print("Font fallback:", e)
        font_bismillah = font_sub = font_parents = font_invite = font_names = font_amp = font_lineage = font_date_huge = font_venue_title = font_venue_sub = font_tagline = ImageFont.load_default()

    # Center text helper
    def draw_centered_text(y, text, font, fill):
        bbox = draw.textbbox((0, 0), text, font=font)
        w = bbox[2] - bbox[0]
        x = (width - w) // 2
        draw.text((x, y), text, font=font, fill=fill)
        return y + (bbox[3] - bbox[1])

    # Top Content
    draw_centered_text(85, "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ", font_bismillah, gold_accent)
    draw_centered_text(130, "BISMILLAHIR RAHMANIR RAHEEM", font_sub, "#776352")
    
    # Quran verse
    draw_centered_text(175, "“And We created you in pairs”  — Surah An-Naba (78:8)", font_tagline, "#8a7562")
    
    # Divider line
    draw.line([(width // 2 - 120, 215), (width // 2 + 120, 215)], fill="#d6beaa", width=1)
    draw_diamond(width // 2, 215, 5, gold_accent)
    
    # Families
    draw_centered_text(235, "Mrs. Ameena (W/o Late Mr. Moidhu Balappil)", font_parents, charcoal)
    draw_centered_text(268, "&", font_amp, gold_accent)
    draw_centered_text(318, "Mr. Kadhar Manikal & Mrs. Khadija", font_parents, charcoal)
    draw_centered_text(355, "cordially invite you to celebrate the blessed Nikah of their beloved children", font_invite, "#635446")

    # Photo Arch Frame in Center
    photo_file = "assets/images/bride.jpg" if photo_choice == "bride" else "assets/images/groom.jpg"
    if os.path.exists(photo_file):
        portrait = Image.open(photo_file).convert("RGB")
        
        # Arch dimensions: 380w x 490h
        arch_w, arch_h = 380, 490
        portrait_resized = portrait.resize((arch_w, arch_h), Image.Resampling.LANCZOS)
        
        # Create Arch Mask
        mask = Image.new("L", (arch_w, arch_h), 0)
        mask_draw = ImageDraw.Draw(mask)
        # Upper circle/arch + lower rect
        radius = arch_w // 2
        mask_draw.pieslice([0, 0, arch_w, arch_w], 180, 360, fill=255)
        mask_draw.rectangle([0, radius, arch_w, arch_h], fill=255)
        
        # Frame placement
        frame_x = (width - arch_w) // 2
        frame_y = 405
        
        # Paste cropped portrait with arch mask
        img.paste(portrait_resized, (frame_x, frame_y), mask)
        
        # Draw Gold Arch Border outline
        border_canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
        b_draw = ImageDraw.Draw(border_canvas)
        
        # Arc top
        b_draw.arc([frame_x - 4, frame_y - 4, frame_x + arch_w + 4, frame_y + arch_w + 4], 180, 360, fill=gold_accent, width=4)
        # Straight sides and bottom
        b_draw.line([(frame_x - 4, frame_y + radius), (frame_x - 4, frame_y + arch_h + 4)], fill=gold_accent, width=4)
        b_draw.line([(frame_x + arch_w + 4, frame_y + radius), (frame_x + arch_w + 4, frame_y + arch_h + 4)], fill=gold_accent, width=4)
        b_draw.line([(frame_x - 4, frame_y + arch_h + 4), (frame_x + arch_w + 4, frame_y + arch_h + 4)], fill=gold_accent, width=4)
        
        # Inner fine line
        b_draw.arc([frame_x - 10, frame_y - 10, frame_x + arch_w + 10, frame_y + arch_w + 10], 180, 360, fill="#e5d0bb", width=1)
        b_draw.line([(frame_x - 10, frame_y + radius), (frame_x - 10, frame_y + arch_h + 10)], fill="#e5d0bb", width=1)
        b_draw.line([(frame_x + arch_w + 10, frame_y + radius), (frame_x + arch_w + 10, frame_y + arch_h + 10)], fill="#e5d0bb", width=1)
        b_draw.line([(frame_x - 10, frame_y + arch_h + 10), (frame_x + arch_w + 10, frame_y + arch_h + 10)], fill="#e5d0bb", width=1)

        img = Image.alpha_composite(img.convert("RGBA"), border_canvas).convert("RGB")
        draw = ImageDraw.Draw(img)

    # Couple Names below photo
    y_after_photo = 925
    draw_centered_text(y_after_photo, "Nizar B.M", font_names, sage_green)
    draw_centered_text(y_after_photo + 56, "(Son of Late Mr. Moidhu Balappil & Mrs. Ameena)", font_lineage, "#605041")
    
    draw_centered_text(y_after_photo + 90, "&", font_amp, gold_accent)
    
    draw_centered_text(y_after_photo + 138, "Shifanath M.K", font_names, sage_green)
    draw_centered_text(y_after_photo + 194, "(Daughter of Mr. Kadhar Manikal & Mrs. Khadija)", font_lineage, "#605041")

    # Date Box
    y_date = y_after_photo + 245
    draw.rectangle([width // 2 - 280, y_date, width // 2 + 280, y_date + 72], outline=gold_outer, fill="#f4ece2", width=2)
    draw_centered_text(y_date + 18, "THURSDAY · 22 OCTOBER 2026", font_date_huge, gold_accent)

    # Two Venues Layout
    y_venues = y_date + 105
    
    # Left / Top: Nikah Ceremony
    v1_box_y = y_venues
    draw_centered_text(v1_box_y, "🕌 THE SACRED NIKAH — 12:00 PM NOON", font_venue_title, sage_green)
    draw_centered_text(v1_box_y + 32, "Old Juma Masjid, Kottamudi · Kodagu (Coorg), Karnataka", font_venue_sub, charcoal)
    
    # Divider dot
    draw.line([(width // 2 - 80, v1_box_y + 75), (width // 2 + 80, v1_box_y + 75)], fill="#dbc5b2", width=1)
    draw_diamond(width // 2, v1_box_y + 75, 4, gold_accent)

    # Right / Bottom: Wedding Lunch Reception
    v2_box_y = v1_box_y + 90
    draw_centered_text(v2_box_y, "🍽️ WEDDING LUNCH FEAST — 12:30 PM ONWARDS", font_venue_title, sage_green)
    draw_centered_text(v2_box_y + 32, "Shadhi Mahal, Cheriyaparambu · Kerala", font_venue_sub, charcoal)

    # Footer
    y_footer = height - 120
    draw.line([(80, y_footer - 15), (width - 80, y_footer - 15)], fill="#e8dacb", width=1)
    draw_centered_text(y_footer, "With Best Compliments from Family, Relatives & Friends", font_sub, "#705d4d")
    draw_centered_text(y_footer + 34, "Wedding Favors & Custom Hampers: @hamper.spot", font_tagline, gold_accent)
    
    out_path = f"assets/images/wedding_poster_{photo_choice}.jpg"
    img.save(out_path, quality=96)
    print(f"Generated {out_path} ({width}x{height})")
    return out_path

if __name__ == "__main__":
    create_wedding_poster("bride")
    create_wedding_poster("groom")
