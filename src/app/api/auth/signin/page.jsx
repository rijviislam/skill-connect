// "use client"


// import { Input, Button, Spacer,Image } from '@nextui-org/react';  


// export default function SignInPage() {

//   return (
//     <div  className="container mx-auto flex justify-center items-center gap-10 h-screen">
//         <div className= "">
//         <Image
//       isBlurred
      
//       src="https://i.ibb.co.com/pbgqN4W/Login-Security.png"
//       alt="NextUI Album Cover"
//       className="w-full"
//     />
//         </div>
//       <div className="w-full">
//       <h3>Sign In</h3> {/* Replaced Text component with h3 */}
//       <form>
    
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
//         <Button type="submit" shadow color="primary" auto>
//           Sign Up
//         </Button>
//       </form>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useRouter } from 'next/navigation';
// import { Input, Button, Spacer, Image } from '@nextui-org/react';
// import { signIn } from 'next-auth/react';

// export default function SignInPage() {
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await signIn("credentials", {
//       redirect: false,
//       email: e.target.email.value,
//       password: e.target.password.value,
//     });
//     if (res?.error) {
//       console.log(res.error);
//     } else {
//       router.push('/'); 
//     }
//   };

//   return (
//     <div className="container mx-auto flex justify-center items-center gap-10 h-screen">
//       <div>
//         <Image
//           isBlurred
//           src="https://i.ibb.co.com/pbgqN4W/Login-Security.png"
//           alt="NextUI Album Cover"
//           className="w-full"
//         />
//       </div>
//       <div className="w-full">
//         <h3>Sign In</h3>
//         <form onSubmit={handleSubmit}>
//           <Input
//             color="primary"
//             type="email"
//             name="email"
//             label="Email"
//             placeholder="skillconnect@gmail.com"
//             className="max-w-[500px]"
//             required
//           />
//           <Spacer y={1.5} />
//           <Input
//             type="password"
//             name="password"
//             color="primary"
//             label="Password"
//             placeholder="Enter your password"
//             className="max-w-[500px]"
//             required
//           />
//           <Spacer y={1.5} />
//           <Button type="submit" shadow color="primary" auto>
//             Sign In
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from 'next/navigation';
import { Input, Button, Spacer, Image } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
    });

    if (res?.error) {
      // Handle error display to the user
      console.log(res.error);
      alert("Sign-in failed: " + res.error); // Replace with your error handling
    } else {
      router.push('/'); 
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center gap-10 h-screen">
      <div>
        <Image
          isBlurred
          src="https://i.ibb.co.com/pbgqN4W/Login-Security.png"
          alt="NextUI Album Cover"
          className="w-full"
        />
      </div>
      <div className="w-full">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
          <Input
            color="primary"
            type="email"
            name="email"
            label="Email"
            placeholder="skillconnect@gmail.com"
            className="max-w-[500px]"
            required
          />
          <Spacer y={1.5} />
          <Input
            type="password"
            name="password"
            color="primary"
            label="Password"
            placeholder="Enter your password"
            className="max-w-[500px]"
            required
          />
          <Spacer y={1.5} />
          <Button type="submit" shadow color="primary" auto>
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
