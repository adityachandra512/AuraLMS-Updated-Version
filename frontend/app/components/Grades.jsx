const Grades = ({ grades }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left p-4">Student</th>
            <th className="text-left p-4">Assignment</th>
            <th className="text-left p-4">Score</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="p-4">{grade.student}</td>
              <td className="p-4">{grade.assignment}</td>
              <td className="p-4">
                <span className="px-2 py-1 bg-green-100 text-green-600 rounded">
                  {grade.score}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Grades;