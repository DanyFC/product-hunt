const Search = () => {

  return (
    <form className="relative flex items-center mr-14">
      <input type="text" className="border border-solid border-gray3 min-w-72 py-1 pl-2 pr-14" placeholder="search products" />
      <button type="submit" className='absolute block top-0 right-0 w-12 h-12 border-none bg-none'>
        <svg className="text-black bg-none w-12 h-12 py-1" fill="none"  stroke="currentColor" ><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
      </button>
    </form>
  )
}

export default Search