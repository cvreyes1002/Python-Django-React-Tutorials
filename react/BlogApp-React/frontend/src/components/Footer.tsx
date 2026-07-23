const Footer = () => {
  return (
    <footer className="border-t text-center text-sm text-slate-500 py-3">
      <p className="m-0">Copyright &copy; {new Date().getFullYear()} <a href="/" className="text-slate-500 hover:underline">Blog App</a>. All rights reserved.</p>
    </footer>
  )
}

export default Footer