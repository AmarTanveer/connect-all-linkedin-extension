export default defineContentScript({
  matches: ["https://www.linkedin.com/mynetwork/grow/"],

  main() {
    console.log("Hello content.");

    // Creating "Connect with All" button
    const button = document.createElement("button");
    button.innerText = "Connect with All";
    button.style.position = "fixed";
    button.style.fontSize = "16px"
    button.style.top = "50%";
    button.style.right = "-45px";
    button.style.backgroundColor = "#1e3a8a";
    button.style.color = "#fff";
    button.style.padding = "10px 20px";
    button.style.border = "none";
    button.style.borderRadius = "5px";
    button.style.cursor = "pointer";
    button.style.zIndex = "10000";
    button.style.transform = "rotate(90deg)";

  
    // Append button to the page
    document.body.appendChild(button);

    // Handle click event for the button
    button.addEventListener("click", () => {
      // Select all span elements on the page
      const spans = document.querySelectorAll("span");

      // Filter spans to find those with inner text "Connect"
      const connectableSpans = Array.from(spans).filter((span) => {
        return span.innerText === "Connect";
      });

      let totalConnectButtons = connectableSpans.length;
      if (totalConnectButtons === 0) {
        alert("No profile available to connect");
        return;
      }

      let index = 0;

      const connectionInterval = setInterval(() => {
        if (index < totalConnectButtons) {
          const button = connectableSpans[index];
          button.click();
          index++;
        } else {
          clearInterval(connectionInterval);
          alert("All connection requests sent!");
        }
      }, Math.random() * (3000 - 1000) + 3000); // Delay between 3-5 seconds (I chose 3-5s range just to be on the safer side)
    });
  },
});
