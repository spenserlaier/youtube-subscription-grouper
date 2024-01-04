import Image from 'next/image'
//import Link from 'next/link';
import {google} from 'googleapis'
import { generateAuthUrl } from '@/utils/auth-utils'


export default function Login() {
    const authURL = generateAuthUrl();

  return (
      <>
          <div>
              this is a default login div
              oh snap
          </div>
          <a href={authURL}>
              authenticate with google
          </a>
      </>
  )
}
