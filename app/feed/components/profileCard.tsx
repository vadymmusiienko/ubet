// TODO: Profile Card Component
//<img className="card-image" src={profilePic as unknown as string} alt = "profile pic"></img>
//<img className= "rounded-lg" src="https://picsum.photos/400/400" alt="Your Image Description"></img> this worked!
//<img className= "rounded-full w-20 h-20 mx-auto" src="/images/will.jpg" alt="Will img"></img> didn't work.

import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";



export default async function ProfileCard() {
    
    const { getUser } = getKindeServerSession();
        const sessionUser = await getUser();

        if (!sessionUser?.id) {
            return (
            <div className="text-center text-red-600 mt-10">
                You must be logged in to view your profile.
            </div>
            );
        }
        

    const user = await prisma.user.findUnique({
        where: { id: sessionUser.id },
        });



    
    return (
            <div className="w-64 h-84 rounded-xl overflow-hidden shadow-lg bg-white text-center ml-10">
                <h1 className="font-bold text-2xl text-center mb-2 mt-5"> {user?.firstName} {user?.lastName} </h1>
                <img className= "rounded-full w-20 h-20 mx-auto" src="https://picsum.photos/400/400" alt="Your Image Description"></img>
                <p className='text-gray-700 ml-1 mr-1 mb-2'> Just trying my best <br></br>
                    out here </p>
                <h2 className='font-semibold text-center mb-5'> Total winning: -$2</h2>                
                <p className='text-gray-700 ml-4 mb-4'> 32 friends</p>
                <div className='text-center mb-10'>
                    <button className='bg-purple-700 text-white py-2 px-4 rounded-3xl'>Visit Profile</button>
                </div>
            </div>
      
        
    );
}

