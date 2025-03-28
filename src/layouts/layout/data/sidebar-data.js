import {
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
export const sidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Campa Cola',
      logo: Command,
      plan: '',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Companies',
          url: '/companies',
          icon: IconChecklist,
        },
        {
          title: 'Users',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },

  ],
}
