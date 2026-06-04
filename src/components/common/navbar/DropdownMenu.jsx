import React from 'react'

function DropdownMenu({categories, navLinkClass}) {
  return (
    <select className={`${navLinkClass} text-[var(--text-secondary)] capitalize focus:ring-0 outline-none font-medium`} name="" id="">
        <option className={navLinkClass}>Categories</option>
        {
            categories.map((category, idx) => (
                <option className={`${navLinkClass} capitalize`}  key={idx} value={category}>{category}</option>
            ))
        }
    </select>
  )
}

export default DropdownMenu;
