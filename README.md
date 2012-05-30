feedhenry-fhgeo-polyfill
========================

Simple polyfill for the $fh.geo function, made to facilitate development of apps using the feature through the online IDE.

## How To Use

Although ultimately it would be great to provide a full `$fh` compatibility layer for use *outside* of the online App Studio IDE, right now the best way to use this is by simply dropping it into your project within App Studio.

The best way to include it in this way would be to create a 'package' within your client directory and include it only for the App Studio Preview build (done from the 'Configuration' tab on the left hand bar in the studio).

---

**NOTE:** This is a very early stab at polyfilling this function; it needs to be made much more robust before I would recommend using it care-free. Not to mention providing proper error functionality...

If you want to fix it up, pull requests are always welcome!
