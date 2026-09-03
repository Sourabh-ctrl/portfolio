export default async function handler(req, res) {
  return res.status(200).json({ todayWorked: '0 mins', yesterdayWorked: '0 mins', isOnline: false, editor: 'VS Code', project: 'portfolio' })
}
