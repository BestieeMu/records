import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div className='w-full h-screen ' style={{
          backgroundImage: `url('https://res.cloudinary.com/dmbsct2bo/image/upload/v1693573091/samples/afrifarm/pattern_waves-4_0.5_2_0-0_40_1__e00b0b_cfcfcf_vtnadh.png')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        <Main />
        </div>
        <NextScript />
      </body>
    </Html>
  )
}
