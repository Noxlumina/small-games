/**
 * helper function to generate a schuffled array of cards
 */
export const generateGridCards = () => {
  const emojis = ["🚀", "😺", "🐶", "🏈", "📦", "🙊"];

  return [...emojis, ...emojis]
    .sort(() => Math.random() - Math.random())
    .map((emoji, idx) => ({ key: idx, emoji }));
};
