document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');

  // 01 Fix the menu
  // Hide menu items by default (we'll do this with CSS)

  // Add an event listener to the menu button
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', function() {
      // Toggle the 'hide' class on the nav links
      navLinks.classList.toggle('hide');
    });
  }

  // 02 Handle the window resize event
  function handleResize() {
    if (window.innerWidth > 1000) {
      navLinks.classList.remove('hide');
    } else {
      navLinks.classList.add('hide');
    }
  }

  // Call handleResize on load
  handleResize();

  // Add event listener for resize
  window.addEventListener('resize', handleResize);

  // Viewer template function
  function viewerTemplate(imgUrl, altText) {
    return `<img src="${imgUrl}" alt="${altText}"><button class='close-viewer'>X</button>`;
  }

  // 03 & 04 Image viewer
  const gallery = document.querySelector('.gallery');
  const body = document.body;
  let dialog;
  let dialogImg;
  let closeButton;

  function openImageViewer(event) {
    const clickedImage = event.target.closest('img');
    if (clickedImage) {
      const src = clickedImage.src;
      const alt = clickedImage.alt;
      const fullSrc = src.replace('-sm.jpeg', '-full.jpeg');

      // Create the dialog element if it doesn't exist
      if (!dialog) {
        dialog = document.createElement('dialog');
        dialog.classList.add('image-viewer');
        // Use viewerTemplate here
        dialog.innerHTML = viewerTemplate(fullSrc, alt);
        body.appendChild(dialog);
      } else {
        // Update dialog content using viewerTemplate
        dialog.innerHTML = viewerTemplate(fullSrc, alt);
      }

      dialogImg = dialog.querySelector('img');
      closeButton = dialog.querySelector('.close-viewer');

      // Remove previous event listeners to avoid duplicates
      closeButton.onclick = null;
      dialog.onclick = null;

      closeButton.addEventListener('click', closeImageViewer);
      dialog.addEventListener('click', closeOnBackdropClick);

      dialog.showModal();
    }
  }

  function closeImageViewer(event) {
    if (dialog && dialog.open) {
      dialog.close();
    }
  }

  function closeOnBackdropClick(event) {
    if (event.target === dialog) {
      dialog.close();
    }
  }

  if (gallery) {
    gallery.addEventListener('click', openImageViewer);
  }
});