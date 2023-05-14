chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // Check if the request is from the background script.
  if (request.from === "background") {

    // Display the image in the page.
    const image = document.createElement("img");
    image.src = `${request.model}.png`;
    document.body.appendChild(image);
    sendResponse({success: true});
  }
});
