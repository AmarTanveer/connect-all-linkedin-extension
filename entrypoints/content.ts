export default defineContentScript({
  matches: ["https://www.linkedin.com/mynetwork/grow/"],

  main() {
    console.log("Hello content.");
  },
});
