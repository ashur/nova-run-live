Select a snippet of text in a JavaScript document, then press `Command-Shift-.` to execute it in the Nova extension runtime.

![](https://github.com/ashur/nova-run-live/raw/main/Run%20Live.novaextension/assets/example.gif)

> 💡 If no text is selected, the contents of the entire document will be run.

## Entitlements

**Run Live** requests all available entitlements:

- Access Clipboard
- Read & Write Files
- Send Network Requests
- Launch Subprocesses

so it can execute snippets that use those portions of the [Nova extension API][entitlements].

## Notes

Selections which call `require()` are not supported.

[entitlements]: https://novadocs.panic.com/extensions/#entitlements
