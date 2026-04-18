import { useAuth } from '../context/AuthContext'

// Returns the current user's role in a given project: 'admin', 'member', or null
// Usage: const role = useProjectRole(project)
export function useProjectRole(project) {
  const { user } = useAuth()

  if (!user || !project) return null

  const leadId = project.projectLead?._id?.toString() || project.projectLead?.toString()
  const userId = user._id?.toString()

  if (leadId === userId) return 'admin'

  const isMember = project.members?.some((member) => {
    const memberId = member?._id?.toString() || member?.toString()
    return memberId === userId
  })

  if (isMember) return 'member'
  return null
}
