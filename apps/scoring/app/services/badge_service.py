import qrcode
from PIL import Image, ImageDraw, ImageFont
import os
import datetime
from io import BytesIO

class BadgeGenerator:
    def __init__(self):
        self.bg_color = "#0D1117"  # GitHub Dark
        self.text_color = "#FFFFFF" # White
        self.accent_color = "#FF5733" # OpenVeda Orange
        self.width = 1200
        self.height = 630

    def generate_qr(self, data: str):
        """Generates a QR code image as a PIL object."""
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=8,
            border=2,
        )
        qr.add_data(data)
        qr.make(fit=True)
        img = qr.make_image(fill_color=self.accent_color, back_color=self.bg_color)
        return img

    def create_certification_card(self, name: str, score: float, uuid: str):
        # Create blank canvas
        img = Image.new('RGB', (self.width, self.height), color=self.bg_color)
        draw = ImageDraw.Draw(img)
        
        # Load fonts (using system defaults for reliability in Docker)
        try:
            font_path = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
            title_font = ImageFont.truetype(font_path, 80)
            subtitle_font = ImageFont.truetype(font_path, 32)
            score_font = ImageFont.truetype(font_path, 120)
            id_font = ImageFont.truetype(font_path, 14)
        except:
            # Fallback to default
            title_font = ImageFont.load_default()
            subtitle_font = ImageFont.load_default()
            score_font = ImageFont.load_default()
            id_font = ImageFont.load_default()

        # Draw decorative accent lines
        draw.line([(0, 0), (self.width, 0)], fill=self.accent_color, width=15)
        
        # Draw "The Contribution" Text
        draw.text((80, 80), "The ", font=title_font, fill=self.text_color)
        draw.text((280, 80), "Contribution", font=title_font, fill=self.accent_color)
        draw.text((80, 160), "Engine", font=title_font, fill=self.text_color)
        
        # Draw Anonymized Role
        draw.text((80, 260), "CERTIFIED OPEN SOURCE ENGINEER", font=subtitle_font, fill="rgba(255, 255, 255, 0.5)")
        
        # Draw Main Score
        draw.text((80, 340), f"{round(score)}", font=score_font, fill=self.text_color)
        
        # Draw Score Label
        draw.text((320, 370), "MASTERY\nSCORE", font=subtitle_font, fill=self.accent_color)
        
        # Generate and paste QR Code pointing to mobile verification
        qr_img = self.generate_qr(f"https://verify.openveda.in/{uuid}")
        img.paste(qr_img, (850, 200))

        # Date of Issuance
        date_str = datetime.datetime.now().strftime("%B %d, %Y")
        draw.text((80, 520), f"Verified on {date_str}", font=subtitle_font, fill="gray")

        # Credential ID (Anonymized)
        draw.text((850, 500), f"ID: {uuid[:18]}...", font=id_font, fill="gray")
        
        # Final Branding
        draw.text((1000, 560), "OPENVEDA.IN", font=subtitle_font, fill="gray")

        # Convert to buffer
        buf = BytesIO()
        img.save(buf, format='PNG')
        return buf.getvalue()

# Usage Example:
# gen = BadgeGenerator()
# badge = gen.create_certification_card("Verified Contributor", 88.42, "uuid-123")
