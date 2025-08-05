import React from 'react'
import SkilBar from '../props/SkilBar'

const MySkil = ({ title, skills }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
      {skills.map((skill, index) => (
        <SkilBar key={index} name={skill.name} percentage={skill.percentage} />
      ))}
    </div>
  )
}

export default MySkil
