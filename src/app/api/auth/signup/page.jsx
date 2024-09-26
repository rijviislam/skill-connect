"use client"


import { Input, Button, Spacer,Image } from '@nextui-org/react';  


export default function SignUpPage() {
  const baseUrl = process.env.NEXT_PUBLIC_NEXT_URL

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            type: e.target.type.value,
            image: e.target.image.value,
        }
        console.log(newUser)
        const resp = await fetch(`${baseUrl}/api/auth/signup/register-user`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "content-type": "application/json"
            }
        })
        console.log(resp)
    }

    // https://i.ibb.co.com/pbgqN4W/Login-Security.png

  return (
    <div  className="container mx-auto flex justify-center items-center gap-10 h-screen">
        <div className= "">
        <Image
      isBlurred
      
      src="https://i.ibb.co.com/8jJYbVw/Young-Man-Register-Domain-Name.png"
      alt="NextUI Album Cover"
      className="w-full"
    />
        </div>
      <div className="w-full">
      <h3>Sign Up</h3> {/* Replaced Text component with h3 */}
      <form onSubmit={handleSubmitForm} >
      <Input
                key="primary"
                type="name"
                name= "name"
                color="primary"
                label="Name"
                placeholder="Enter Your name"
                className="max-w-[500px]"
                required
                // {...register("name")}
              />
              {/* {errors.name && <span>Title is required</span>} */}
        
        <Spacer y={1.5} />
        <Input
                key="primary"
                color="primary"
                type="email"
                name="email"
      label="Email"
      placeholder="skillconnect@gmail.com"
                className="max-w-[500px]"
                required
                // {...register("email")}
              />
              {/* {errors.email && <span>Title is required</span>} */}
        
        <Spacer y={1.5} />
        <Input
                key="primary"
                type="password"
                name="password"
                color="primary"
                label="Password"
      placeholder="Enter your password"
                className="max-w-[500px]"
                required
                // {...register("password")}
              />
              {/* {errors.password && <span>Title is required</span>} */}
        
        <Spacer y={1.5} />
        <Input
                key="primary"
                type="text"
                name="type"
                color="primary"
                label="Type"
      placeholder="Enter your Type"
                className="max-w-[500px]"
                required
                // {...register("password")}
              />
              {/* {errors.password && <span>Title is required</span>}
              
        
        {/* <Spacer y={1.5} />
        <Input
        key="primary"
          type="file"
          color="primary"
          placeholder="Image File"
      className="max-w-[500px]"
      // {...register("file")}
      /> */}
      {/* {errors.file && <span>Title is required</span>} */}
      <Spacer y={1.5} />
        <Input
                key="primary"
                type="text"
                name="image"
                color="primary"
                label="Image link"
      placeholder="Enter your Image link"
                className="max-w-[500px]"
                required
                />
        <Spacer y={1.5} />
        <Button type="submit" shadow color="primary" auto>
          Sign Up
        </Button>
      </form>
      </div>
    </div>
  );
}