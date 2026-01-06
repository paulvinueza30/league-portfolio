
export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-[#463714] bg-[#0A1428] py-8 mt-12">
      <div className="mx-auto max-w-4xl px-6 flex flex-col items-center gap-4">
        <p className="text-sm text-[#CDBE91]">
          On the journey to getting cracked, {currentYear} 
        </p>
      </div>
    </footer>
  )
}

