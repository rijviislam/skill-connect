// "use client"


// import { Input, Button, Spacer,Image } from '@nextui-org/react';
// import { useRouter } from 'next/router'; 


// export default function SignUpPage() {
//   const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL
//   const router = useRouter(); // Initialize useRouter

//     const handleSubmitForm = async (e) => {
//         e.preventDefault()
//         const newUser = {
//             name: e.target.name.value,
//             email: e.target.email.value,
//             password: e.target.password.value,
//             type: e.target.type.value,
//             image: e.target.image.value,
//         }
//         console.log(newUser)
//         const resp = await fetch(`${baseUrl}/api/auth/signup/register-user`, {
//             method: "POST",
//             body: JSON.stringify(newUser),
//             headers: {
//                 "content-type": "application/json"
//             }
//         })
//         console.log(resp)

//         // Check if the response is successful (status 200)
//         if (resp.ok) {
//           router.push('/api/auth/signin');
//         } else {
//           console.error('Failed to register:', await resp.text());
//         }

//     }


//   return (
//     <div  className="container mx-auto flex justify-center items-center gap-10 h-screen">
//         <div className= "">
//         <Image
//       isBlurred
      
//       src="https://i.ibb.co.com/8jJYbVw/Young-Man-Register-Domain-Name.png"
//       alt="NextUI Album Cover"
//       className="w-full"
//     />
//         </div>
//       <div className="w-full">
//       <h3>Sign Up</h3> {/* Replaced Text component with h3 */}
//       <form onSubmit={handleSubmitForm} >
//       <Input
//                 key="primary"
//                 type="name"
//                 name= "name"
//                 color="primary"
//                 label="Name"
//                 placeholder="Enter Your name"
//                 className="max-w-[500px]"
//                 required
//                 // {...register("name")}
//               />
//               {/* {errors.name && <span>Title is required</span>} */}
        
//         <Spacer y={1.5} />
//         <Input
//                 key="primary"
//                 color="primary"
//                 type="email"
//                 name="email"
//       label="Email"
//       placeholder="skillconnect@gmail.com"
//                 className="max-w-[500px]"
//                 required
//                 // {...register("email")}
//               />
//               {/* {errors.email && <span>Title is required</span>} */}
        
//         <Spacer y={1.5} />
//         <Input
//                 key="primary"
//                 type="password"
//                 name="password"
//                 color="primary"
//                 label="Password"
//       placeholder="Enter your password"
//                 className="max-w-[500px]"
//                 required
//                 // {...register("password")}
//               />
//               {/* {errors.password && <span>Title is required</span>} */}
        
//         <Spacer y={1.5} />
//         <Input
//                 key="primary"
//                 type="text"
//                 name="type"
//                 color="primary"
//                 label="Type"
//       placeholder="Enter your Type"
//                 className="max-w-[500px]"
//                 required
//                 // {...register("password")}
//               />
//               {/* {errors.password && <span>Title is required</span>}
              
        
//         {/* <Spacer y={1.5} />
//         <Input
//         key="primary"
//           type="file"
//           color="primary"
//           placeholder="Image File"
//       className="max-w-[500px]"
//       // {...register("file")}
//       /> */}
//       {/* {errors.file && <span>Title is required</span>} */}
//       <Spacer y={1.5} />
//         <Input
//                 key="primary"
//                 type="text"
//                 name="image"
//                 color="primary"
//                 label="Image link"
//       placeholder="Enter your Image link"
//                 className="max-w-[500px]"
//                 required
//                 />
//         <Spacer y={1.5} />
//         <Button type="submit" shadow color="primary" auto>
//           Sign Up
//         </Button>
//       </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { Input, Button, Spacer, Image } from '@nextui-org/react';
import { useRouter } from 'next/navigation';


export default function SignUpPage() {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL;
  const router = useRouter();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const newUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      type: e.target.type.value,
      image: e.target.image.value,
    };

    const resp = await fetch(`${baseUrl}/api/auth/signup/register-user`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(resp)

    if (resp.ok) {
      router.push('/api/auth/signin'); 
    } else {
      console.log("register error");
    }
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-center items-center gap-10 h-screen px-4">
    <div className="flex-shrink-0">
      <Image
        isBlurred
        src="https://i.ibb.co/W3wPyqm/Sign-up-amico.png"
        alt="NextUI Album Cover"
        className=" w-[600px]"
      />
    </div>
    <div className="w-full max-w-md">
      <h3 className="text-3xl font-semibold mb-4 text-green-600 text-center">Sign Up</h3>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <Input
            type="text"
            name="image"
            label="Image link"
            placeholder="Enter your Image link"
            required
            className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            name="name"
            label="Name"
            placeholder="Enter Your name"
            required
            className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="skillconnect@gmail.com"
            required
            className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            required
            className="w-full border-2 border-green-500 rounded-xl focus:border-green-700 hover:border-green-600 transition duration-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Type
          </label>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="freelancer"
                required
                className="form-radio text-green-500 rounded-xl focus:ring-green-700 hover:bg-green-200"
              />
              <span className="ml-2">Freelancer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="client"
                required
                className="form-radio text-green-500 rounded-xl focus:ring-green-700 hover:bg-green-200"
              />
              <span className="ml-2">Client</span>
            </label>
          </div>
        </div>
        <Button
          type="submit"
          shadow
          color="success"
          auto
          className="w-full bg-green-500 rounded-xl hover:bg-green-600 text-white transition duration-200"
        >
          Sign Up
        </Button>
      </form>
    </div>
  </div>
  
  
  );
}
