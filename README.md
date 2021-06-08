# Photo Blog
This is the frontend for an auto-publish Photo Blog system. It's a Next.js app with:
* `/` - lists all *albums*
* `/album/{albumName}` - displays the *content of the album*

Read about the system in my [blog](https://www2.oskarlindgren.se/blog/photo-blog-with-nextjs-deno-syncthing). 
tl;dr the photos are synced by syncthing, served by the backend and displayed with this frontend.

Check out the [photo-file-server](https://github.com/MrOggy85/photo-file-server) which is the backend.

## Develop
```sh
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
