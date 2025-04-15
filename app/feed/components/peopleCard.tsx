// TODO: People you may know component card

export default function PeopleCard() {
    return (
        <div className="w-64 h-84 rounded-xl overflow-hidden shadow-lg bg-white text-center">
            <h1 className="font-bold text-xl text-center mt-5 mb-10">People you may know</h1>
            <div className="font-bold text-base text-center mb-10 flex items-center gap-6" >
                <img className= "rounded-full w-12 h-12 ml-5" src="https://images.squarespace-cdn.com/content/v1/5d5aca05ce74150001a5af3e/2c559654-9f1c-4892-924b-e5b9b1500a5a/UBet+%28goal+tracking+app%29+logo.jpg?format=750w" alt="Your Image Description"></img>
                <div className="flex flex-col">
                    <p className="font-bold text-base"> Angie Zhou </p>
                    <p className="font-bold text-sm text-gray-500 text-left">@angiezh</p>
                </div>
            </div>
            <div className="font-bold text-base text-center mb-10 flex items-center gap-6" >
                <img className= "rounded-full w-12 h-12 ml-5" src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Your Image Description"></img>
                <div className="flex flex-col">
                    <p className="font-bold text-base"> John Smith </p>
                    <p className="font-bold text-sm text-gray-500 text-left">@johnsmith</p>
                </div>
            </div>
            <div className="font-bold text-base text-center mb-10 flex items-center gap-6" >
                <img className= "rounded-full w-12 h-12 ml-5" src="https://www.psdstack.com/wp-content/uploads/2019/08/copyright-free-images-750x420.jpg" alt="Your Image Description"></img>
                <div className="flex flex-col">
                    <p className="font-bold text-base"> Jane Doe </p>
                    <p className="font-bold text-sm text-gray-500 text-left">@janedoe</p>
                </div>
            </div>
        </div>
    );
}
