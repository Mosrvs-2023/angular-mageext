const models = ["Analog", "Anything v3", "Arcane", "Archer", "Deliberate", "Disney Pixar", "Eimis", "F222", "Parti", "PPP", "StyleCLIP", "Stable Diffusion", "DALL-E 2", "Imagen", "Midjourney", "Parti", "DALL-E mini"];

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  // Check if the request is from the content script.
  if (request.from === "content") {

    // Generate an image from the text prompt and the AI model.
    const url = `https://mage.space/api/generate?prompt=${request.prompt}&model=${request.model}`;
    const response = requests.get(url);
    const imageData = response.body;

    // Save the image to a file.
    const image = new Image();
    image.src = imageData;
    image.onload = () => {
      image.save(`${request.model}.png`);
      sendResponse({success: true});
    };
  } else if (request.from === "models") {
    // Get the list of models.
    const model = models[request.index];

    // Open a new tab for the model.
    chrome.tabs.create({
      url: `https://mage.space/api/generate?prompt=${request.prompt}&model=${model}`,
      active: true
    });
  }
});
