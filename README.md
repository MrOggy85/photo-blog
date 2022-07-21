# Photo Blog

This is the frontend for an auto-publish Photo Blog system

- `/` - lists all _albums_
- `/{albumName}` - displays the _images of the album_

Read about the system in my
[blog](https://www.okuno.se/blog/photo-blog-with-nextjs-deno-syncthing). tl;dr
the photos are synced by syncthing, served by the backend and displayed with
this frontend.

Check out the [photo-file-server](https://github.com/MrOggy85/photo-file-server)
which is the backend.

## Development

```bash
# install dependencies
$ ./run.sh
```

For detailed explanation on how things work, check out
[Deno docs](https://deno.land/).

- powered by Deno
- served by Deno Deploy
