# Photo Blog

This is the frontend for an auto-publish Photo Blog system

- `/` - lists all _albums_
- `/{albumName}` - displays the _images of the album_

Read about the system in my
[blog](https://www.okuno.se/blog/photo-blog-with-nextjs-deno-syncthing).

_tl;dr_ the photos are synced by syncthing, served by the API and displayed with
this frontend.

## Development

```bash
$ ./run.sh
```

For detailed explanation on how things work, check out
[Deno docs](https://deno.land/).

- written in [TypeScript](https://www.typescriptlang.org/)
- powered by [Deno](https://deno.land/)
- served by [Deno Deploy](https://deno.com/deploy)
- synced by [Syncthing](https://syncthing.net/)
