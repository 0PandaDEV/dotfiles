/// <reference path="./gstpbutils-1.0.d.ts" />
/// <reference path="./gstvideo-1.0.d.ts" />
/// <reference path="./gstbase-1.0.d.ts" />
/// <reference path="./gst-1.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./gstaudio-1.0.d.ts" />
/// <reference path="./gupnpdlna-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://GUPnPDLNAGst?version=2.0' {
    // Module dependencies
    import type GstPbutils from 'gi://GstPbutils?version=1.0';
    import type GstVideo from 'gi://GstVideo?version=1.0';
    import type GstBase from 'gi://GstBase?version=1.0';
    import type Gst from 'gi://Gst?version=1.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';
    import type GstAudio from 'gi://GstAudio?version=1.0';
    import type GUPnPDLNA from 'gi://GUPnPDLNA?version=2.0';

    export namespace GUPnPDLNAGst {
        /**
         * GUPnPDLNAGst-2.0
         */

        /**
         * This utility function creates a #GUPnPDLNAInformation from
         * #GstDiscovererInfo. Its purpose is mainly to pass its result to
         * gupnp_dlna_profile_guesser_guess_profile_from_info() to avoid
         * rediscovering of a URI. Created #GUPnPDLNAInformation takes a
         * reference on `info`.
         * @param info A #GstDiscovererInfo object.
         * @returns A #GUPnPDLNAInformation. Unref it when done with it.
         */
        function utils_information_from_discoverer_info(info: GstPbutils.DiscovererInfo): GUPnPDLNA.Information;
        /**
         * Name of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L188
         */
        const __name__: string;
        /**
         * Version of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L189
         */
        const __version__: string;
    }

    export default GUPnPDLNAGst;
}

declare module 'gi://GUPnPDLNAGst' {
    import GUPnPDLNAGst20 from 'gi://GUPnPDLNAGst?version=2.0';
    export default GUPnPDLNAGst20;
}
// END
