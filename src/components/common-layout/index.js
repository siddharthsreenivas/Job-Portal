const CommonLayout = ({children}) => {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
        {/* Header */}

        {/* Main */}
        <main>
            {children}
        </main>
    </div>
  )
}
export default CommonLayout