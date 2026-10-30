<<<<<<< HEAD
# Porutselvi A: Portfolio

Plain HTML5, CSS3 and vanilla JavaScript. No build step.

## Open it
Double-click `index.html`. Fonts and the EmailJS SDK need internet.

## Files
- `index.html`: content and structure
- `style.css`: theme (colour variables at the top)
- `script.js`: interactions and EmailJS settings
- `assets/images/`: screenshots and profile photo
- `Porutselvi_A_Resume.pdf`: linked by the Download Resume button

## 1. Set up EmailJS (contact form)
1. Sign up at https://www.emailjs.com and open **Email Services** > **Add New Service** (e.g. Gmail). Copy the **Service ID**.
2. Open **Email Templates** > **Create New Template**. Set "To email" to your address and use these variables in the body: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`. Copy the **Template ID**.
3. Open **Account** > **General** and copy the **Public Key**.
4. In `script.js`, replace `YOUR_EMAILJS_PUBLIC_KEY`, `YOUR_EMAILJS_SERVICE_ID` and `YOUR_EMAILJS_TEMPLATE_ID`.
5. Send a test message. Until all three are set, the form opens a `mailto:` message instead.

Only the public key belongs in frontend code. Never put a private key or email password here.

## 2. Replace placeholders (checklist)
- [ ] EmailJS: 3 values in `script.js`
- [ ] Live URLs in `index.html`: search for `REPLACE_WITH_MAISON_DE_DOUCE_URL` (appears twice), `REPLACE_WITH_GOVTMATE_AI_URL`, `REPLACE_WITH_VEYRA_FASHION_URL`, `REPLACE_WITH_LAKSHU_TAILORING_URL`
- [ ] LinkedIn and Instagram: `REPLACE_WITH_LINKEDIN_URL`, `REPLACE_WITH_INSTAGRAM_URL`
- [ ] Screenshots: overwrite the four PNGs in `assets/images/` (same file names, about 1600x1000, under 300 KB)
- [ ] Profile photo: overwrite `assets/images/profile-placeholder.png` (square)
- [ ] GitHub Source buttons: uncomment the example in the Lakshu Tailoring card (or copy it to other cards) and add repo URLs
- [ ] Favicon: optional, swap the inline icon in `<head>`
- [ ] Update `alt` text on screenshots once the real images are in

Links that still start with `REPLACE_` are disabled and show a hint, so nothing broken is published.

## 3. Deploy
- **GitHub Pages:** push the folder to a repo, then Settings > Pages > deploy from the main branch.
- **Vercel / Netlify:** import the repo or drag the folder in. No build command needed.
=======
# My-Portfolio
Passionate Web Developer creating modern, responsive, and user-friendly websites with creativity and clean code.
>>>>>>> d757c5f5152c47ceadf293adf3ce92aa319e6f78
