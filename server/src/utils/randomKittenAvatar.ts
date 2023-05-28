export const getRandomKittenAvatars = () => {
  const randomString = (Math.random() + 1).toString(36).substring(7);
  return `${process.env.URL_KITTEN_AVATAR as string}/${randomString}.png?set=${
    process.env.SET as string
  }`;
};
