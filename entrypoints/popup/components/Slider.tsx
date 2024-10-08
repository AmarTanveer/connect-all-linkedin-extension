
interface Props {
  max: number;
  connectWithOnly: (noOfProfile: number) => void;
}

function Slider(props: Props) {
    const [sliderValue, setSliderValue] = useState(0);
   
    console.log(props.max);
  return (
    <div>
        <div className="font-bold">
        <p className="text-xs mb-3 text-blue-300">Total profiles available to connect: {props.max}</p>
            <h1 className="text-3xl font-bold">{sliderValue}</h1>
            
        <input type="range" min={0} max={props.max} step={1} onChange={(e) => {
            const newValue = Number(e.currentTarget.value);
            setSliderValue(newValue);
            props.connectWithOnly(newValue);
            }} className="mb-10"/>
           
        </div>
    </div>
  );
}

export default Slider;
