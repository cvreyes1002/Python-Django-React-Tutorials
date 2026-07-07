import LoginBar from "../components/LoginBar"
import RegisterForm from "../components/RegisterForm"

const TopPage = () => {
  localStorage.clear(); // Clear localStorage when the TopPage component is rendered
  
  return (
    <>
    <LoginBar />
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-7 py-6 md:py-12">
          <h1 className="text-5xl font-light tracking-tight text-gray-900 mb-4">
            Remember Writing?
          </h1>
          <p className="text-xl font-light text-gray-500 leading-relaxed">
            Are you sick of short tweets and impersonal "shared" posts that are reminiscent of the late 90’s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.
          </p>
        </div>

        {/* Right Column (Register Form) */}
        <div className="lg:col-span-5 pb-6 lg:py-12 lg:pl-8">
          <RegisterForm />
        </div>

      </div>
    </div>
    </>


    // <div className="w-full lg:w-7/12 py-12 md:py-20">
    //   <h1 className="text-5xl font-light leading-tight md:text-6xl lg:text-7xl">Remember Writing?</h1>
    //   <p className="text-xl font-light text-gray-500">Are you sick of short tweets and impersonal &ldquo;shared&rdquo; posts that are reminiscent of the late 90&rsquo;s email forwards? We believe getting back to actually writing is the key to enjoying the internet again.</p>
    // </div>

  )
}

export default TopPage