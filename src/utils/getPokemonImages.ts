// @ts-nocheck

const fetchImages = (context: string) => {
  const images = {};
  const cache = {};
  // Function to import all images from the specified context
  function importAll(r) {
    r.keys().forEach((key) => (cache[key] = r(key)));
  }

  // Call importAll function with the provided context
  importAll(context);

  // Convert the cache object to an images object with modified keys
  Object.entries(cache).forEach((module: string[]) => {
    let key = module[0].split("");
    key.splice(0, 2);
    key.splice(-4, 4);
    images[[key.join("")]] = module[1];
  });

  return images;
};

// Call fetchImages to get the shiny images
export const images = fetchImages(
  require.context("../assets/pokemons/shiny", false, /\.(png|jpe?g|svg)$/)
);

// Call fetchImages to get the default images
export const defaultImages = fetchImages(
  require.context("../assets/pokemons/default", false, /\.(png|jpe?g|svg)$/)
);
