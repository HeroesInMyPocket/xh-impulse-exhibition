const works = [
    {
        author: "цвета",
        image: "images/photo_2026-11-08_12-48-32.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/ltsvetti"}
        ]
    },
    {
        author: "жека",
        image: "images/photo_2026-11-08_21-50-19.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/immacrab"}
        ]
    },
    {
        author: "muhachan",
        image: "images/photo_2026-11-08_21-46-35.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/mhlvxhh"}
        ]
    },
    {
        author: "Унисоня",
        image: "images/1790711292813.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/unisonya_biblusic"}
        ]
    },
    {
        author: "Sunday",
        image: "images/photo_2026-11-08_21-53-31.jpg",
        socials: [
            {label: "TIKTOK", url: "https://www.tiktok.com/@sun.day660"}
        ]
    },
    {
        author: "The Holy Hedgie",
        image: "images/photo_2026-11-08_21-56-52.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/the_holy_hedgie"},
            {label: "INSTAGRAM", url: "https://www.instagram.com/art.by.hedgie"}
        ]
    },
    {
        author: "vvidji",
        image: "images/photo_2026-11-08_21-59-47.jpg",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/vidjihello"}
        ]
    },
    {
        author: "Mifirofu",
        image: "images/Без названия 102_202610282004_49320.png",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/mifirofu"}
        ]
    },
    {
        author: "meirenée",
        image: "images/photo_2026-11-08_22-04-08.jpg",
        socials: [
            {label: "TIKTOK", url: "https://www.tiktok.com/@immeirenee"},
            {label: "PINTEREST", url: "https://pin.it/4Tx8D7yBw"}
        ]
    },
    {
        author: "meirenée",
        image: "images/photo_2026-11-08_22-04-10.jpg",
        socials: [
            {label: "TIKTOK", url: "https://www.tiktok.com/@immeirenee"},
            {label: "PINTEREST", url: "https://pin.it/4Tx8D7yBw"}
        ]
    },
    {
        author: "Анна",
        image: "images/Без названия12_20261028003208.png",
        socials: [
            {label: "TELEGRAM", url: "https://t.me/my_asmaton"}
        ]
    }
];

const gallery = document.getElementById("gallery-grid");
const intro = document.getElementById("intro");
const siteShell = document.getElementById("site-shell");

const viewer = document.getElementById("artwork-viewer");
const viewerImageWrap = document.getElementById("viewer-image-wrap");
const viewerClose = document.getElementById("viewer-close");
const viewerAuthor = document.getElementById("viewer-author");
const viewerSocials = document.getElementById("viewer-socials");

let currentViewerImage = null;

function createSocialLink(link) {
    const anchor = document.createElement("a");
    anchor.className = "social-link";
    anchor.textContent = link.label;
    anchor.href = link.url;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
}

function createArtworkImage(work, large = false) {
    const frame = document.createElement("div");
    frame.className = "artwork-media";
    const image = document.createElement("img");
    image.className = "artwork-image";
    image.src = work.image;
    frame.append(image);
    return frame;
}

function createArtworkCard(work) {
    const card = document.createElement("article");
    card.className = "artwork-card";

    const imageButton = document.createElement("button");
    imageButton.className = "artwork-card__image-button";
    imageButton.type = "button";

    const artworkFrame = createArtworkImage(work);
    const thumbnail = artworkFrame.querySelector(".artwork-image");
    imageButton.style.aspectRatio = `${thumbnail.naturalWidth} / ${thumbnail.naturalHeight}`;
    imageButton.append(artworkFrame);
    imageButton.addEventListener("click", () => openArtwork(work));

    const details = document.createElement("div");
    details.className = "artwork-card__details";

    const author = document.createElement("span");
    author.className = "artwork-card__author";
    author.textContent = work.author;

    const socials = document.createElement("div");
    socials.className = "social-links";
    work.socials.forEach(link => socials.append(createSocialLink(link)));

    details.append(author, socials);
    card.append(imageButton, details);
    return card;
}

function renderGallery() {
    const fragment = document.createDocumentFragment();
    works.forEach(work => fragment.append(createArtworkCard(work)));
    gallery.replaceChildren(fragment);
}

function sizeViewerToImage() {
    if (!currentViewerImage) {
        return;
    }

    const maxWidth = Math.max(220, window.innerWidth - 40);
    const maxHeight = Math.max(160, window.innerHeight - 150);
    const scale = Math.min(
        maxWidth / currentViewerImage.naturalWidth,
        maxHeight / currentViewerImage.naturalHeight,
        1
    );

    const imageWidth = Math.max(1, Math.round(currentViewerImage.naturalWidth * scale));
    const imageHeight = Math.max(1, Math.round(currentViewerImage.naturalHeight * scale));

    viewer.style.width = `${imageWidth + 2}px`;
    viewer.style.setProperty("--viewer-image-height", `${imageHeight}px`);
}

function openArtwork(work) {
    const imageFrame = createArtworkImage(work, true);
    viewerImageWrap.replaceChildren(imageFrame);

    currentViewerImage = imageFrame.querySelector(".artwork-image");
    viewer.style.removeProperty("width");
    viewer.style.removeProperty("--viewer-image-height");

    sizeViewerToImage();

    viewerAuthor.textContent = work.author;
    viewerSocials.replaceChildren();
    work.socials.forEach(link => viewerSocials.append(createSocialLink(link)));

    if (typeof viewer.showModal === "function") {
        viewer.showModal();
    } else {
        viewer.setAttribute("open", "");
    }
}

function closeArtwork() {
    if (typeof viewer.close === "function" && viewer.open) {
        viewer.close();
    } else {
        viewer.removeAttribute("open");
    }

    currentViewerImage = null;
    viewer.style.removeProperty("width");
    viewer.style.removeProperty("--viewer-image-height");
}

function openExhibition() {
    intro.inert = true;
    intro.setAttribute("aria-hidden", "true");

    intro.classList.add("is-opening");
    siteShell.setAttribute("aria-hidden", "false");
    document.body.classList.add("has-entered");
    document.body.classList.remove("is-locked");

    intro.hidden = true;
    window.scrollTo({top: 0, behavior: "auto"});
}

window.addEventListener("resize", sizeViewerToImage);

renderGallery();
intro.addEventListener("click", openExhibition);
viewerClose.addEventListener("click", closeArtwork);
viewer.addEventListener("click", event => {
    if (event.target === viewer) closeArtwork();
});
