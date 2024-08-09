import { FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { SiFrontendmentor } from 'react-icons/si';
import { TbBrandGithubFilled, TbBrandYoutubeFilled } from 'react-icons/tb';

export const dropdownList = [
  {
    icon: <TbBrandGithubFilled />,
    provider: 'Github',
    bg: 'bg-[#333]',
  },
  {
    icon: <FaFacebook />,
    provider: 'Facebook',
    bg: 'bg-[#1877f2]',
  },
  {
    icon: <TbBrandYoutubeFilled />,
    provider: 'YouTube',
    bg: 'bg-[#ff0000]',
  },
  {
    icon: <FaLinkedin />,
    provider: 'LinkedIn',
    bg: 'bg-[#0a66c2]',
  },
  {
    icon: <SiFrontendmentor />,
    provider: 'Frontend Mentor',
    bg: 'bg-[#35465d]',
  },
];

export const valUrl =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
