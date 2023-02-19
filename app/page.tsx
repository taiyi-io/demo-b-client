'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LandingPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  React.useEffect(() =>{
    let language = searchParams.lang;
    if (language && 'en' === language){
      router.push('/en-us/');
    }else{
      router.push('/zh-cn/');
    }
  }, [router, searchParams]);

  return <div/>
}

