import Slider from "./Slider";
import { useState, useEffect } from "react";
import logo from "../../../public/icon/128.png";

export default function ConnectButton() {
  const [totalConnectButtons, setTotalConnectButtons] = useState<number>(0);
  const [noOfProfilesToConnect, setNoOfProfilesToConnect] = useState<number>(0);

  useEffect(() => {
    // Finding profiless that have connect button
    const findTotalConnectableProfiles = async () => {
      let [tab] = await chrome.tabs.query({ active: true });
      chrome.scripting.executeScript({
        target: { tabId: tab.id! },
        func: () => {
          // Select all span elements on the page
          const spans = document.querySelectorAll("span");

          // Filter spans to find the spans with the inner text "Connect"
          const connectableSpans = Array.from(spans).filter((span) => {
            return span.innerText === "Connect";
          });

          chrome.runtime.sendMessage({ connectableSpans });
        },
      });
    };
    findTotalConnectableProfiles();
    chrome.runtime.onMessage.addListener((message) => {
      if (message.connectableSpans.length > 0) {
        setTotalConnectButtons(message.connectableSpans.length);

      }
    });
  }, []);

  chrome.runtime.sendMessage({ noOfProfilesToConnect });

  // Function to connect to only limited number of profiles
  const connectLimited = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<number[], void>({
      target: { tabId: tab.id! },

      // Sending slider value as the argument
      func: (noOfProfilesToConnect) => {
        const spans = document.querySelectorAll("span");

        const connectableSpans = Array.from(spans).filter((span) => {
          return span.innerText === "Connect";
        });

        let index = 0;

        if (noOfProfilesToConnect === 0) {
          alert("No profile available to connect");
          return;
        }
        const connectionInterval = setInterval(() => {
          if (index < noOfProfilesToConnect) {
            const button = connectableSpans[index];
            button.click();
            index++;
          } else {
            clearInterval(connectionInterval);
            alert("All connection requests sent!");
          }
        }, Math.random() * (3000 - 1000) + 3000); // Delay between 3-5 seconds (I chose 3-5s range just to be on the safer side)
      },
      args: [noOfProfilesToConnect],
    });
  };

  const connectAll = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (totalConnectButtons) => {
        // Select all span elements on the page
        const spans = document.querySelectorAll("span");

        // Filter spans to find those with inner text "Connect"
        const connectableSpans = Array.from(spans).filter((span) => {
          return span.innerText === "Connect";
        });

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
        }, Math.random() * (3000 - 1000) + 3000); // Delay between 3-5 seconds(I chose 3-5s range just to be on the safer side)
      },
      args: [totalConnectButtons]
    });
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8 bg-blue-900 py-2 px-4 rounded-md">
        <img src={logo} className="w-1/6" alt="Extension Logo" />
        <p className="text-[10px] text-left"><span className="font-black text-xl text-blue-00">QuickConnect!</span><br /> Effortless Networking with a Click </p>
      </div>
      <Slider
        max={totalConnectButtons}
        connectWithOnly={(noOfProfile) => setNoOfProfilesToConnect(noOfProfile)}
      ></Slider>
      <button onClick={connectLimited} className="mb-3">
        Connect with only {noOfProfilesToConnect} profiles
      </button>
      <button onClick={connectAll} className="bg-blue-500 hover:bg-blue-950">
        Connect with all
      </button>
    </div>
  );
}
