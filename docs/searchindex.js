Object.assign(window.search, {"doc_urls":["1.Introduction/index.html#介绍","1.Introduction/index.html#todo","1.Introduction/index.html#关于这本书","1.Introduction/index.html#关于作者","1.Introduction/1.High-level_Wayland_Design.html#wayland-的上层设计","1.Introduction/1.High-level_Wayland_Design.html#现实情况","1.Introduction/1.High-level_Wayland_Design.html#硬件部分","1.Introduction/1.High-level_Wayland_Design.html#内核部分","1.Introduction/1.High-level_Wayland_Design.html#用户态","1.Introduction/1.High-level_Wayland_Design.html#libdrm","1.Introduction/1.High-level_Wayland_Design.html#mesa","1.Introduction/1.High-level_Wayland_Design.html#libinput","1.Introduction/1.High-level_Wayland_Design.html#eudev","1.Introduction/1.High-level_Wayland_Design.html#xkbcommon","1.Introduction/1.High-level_Wayland_Design.html#pixman","1.Introduction/1.High-level_Wayland_Design.html#libwayland","1.Introduction/1.High-level_Wayland_Design.html#其他"],"index":{"documentStore":{"docInfo":{"0":{"body":11,"breadcrumbs":0,"title":0},"1":{"body":34,"breadcrumbs":1,"title":1},"10":{"body":16,"breadcrumbs":2,"title":1},"11":{"body":7,"breadcrumbs":2,"title":1},"12":{"body":5,"breadcrumbs":2,"title":1},"13":{"body":12,"breadcrumbs":2,"title":1},"14":{"body":0,"breadcrumbs":2,"title":1},"15":{"body":7,"breadcrumbs":2,"title":1},"16":{"body":5,"breadcrumbs":1,"title":0},"2":{"body":12,"breadcrumbs":0,"title":0},"3":{"body":15,"breadcrumbs":0,"title":0},"4":{"body":1,"breadcrumbs":2,"title":1},"5":{"body":13,"breadcrumbs":1,"title":0},"6":{"body":9,"breadcrumbs":1,"title":0},"7":{"body":30,"breadcrumbs":1,"title":0},"8":{"body":0,"breadcrumbs":1,"title":0},"9":{"body":8,"breadcrumbs":2,"title":1}},"docs":{"0":{"body":"banner Wayland 是一个为了替代 Xorg 服务而设计和构建的，用于类 Unix 系统的下一代显示服务。并自称是将应用程序窗口显示在用户屏幕上的最佳方法。过去曾经使用过 X11 的读者会对 Wayland 的改进感到惊喜，而 Unix 上的图形新手将发现它是一个灵活而强大的系统，可用于构建图形应用程序和桌面。 这本书将会帮助您深入理解 Wayland 的概念、设计和实现，并为您提供构建自行构建 Wayland 客户端和服务端所需的工具。在阅读过程中，我们将构建 Wayland 的理想模型，并建立对其原理的认知。在这本书中，你能发现许多令你恍然大悟的时刻，Wayland 直观的设计让选择变得更加明确，有利于保持顺畅的阅读体验。欢迎来到开源图形的未来！ 注意： 这还只是草案。第一到第十章基本已完成，可能后续会有所更新。第十一章及后续内容大部分有待撰写。","breadcrumbs":"介绍 » 介绍","id":"0","title":"介绍"},"1":{"body":"Expand on resource lifetimes and avoiding race conditions in chapter 2.4 Move linux-dmabuf details to the appendix, add note about wl_drm & Mesa Rewrite the introduction text Add example code for interactive move, to demonstrate the use of serials Use — instead of - where appropriate Prepare PDFs and EPUBs","breadcrumbs":"介绍 » TODO","id":"1","title":"TODO"},"10":{"body":"Mesa 是 Linux 图形栈中最为重要的部分之一。它除了为 Linux 提供 OpenGL（和 Vulkan）的厂家优化实现之外，还提供了 GBM（Generic Buffer Management）库，这是一种在 libdrm 之上的抽象层，用于在 GPU 上分配缓冲区。大多数 Wayland 混成器将通过 Mesa 同时使用 GBM 和 OpenGL，且多数客户端至少使用 OpenGL 或 Vulkan 其中一种实现。","breadcrumbs":"介绍 » Wayland 的上层设计 » Mesa","id":"10","title":"Mesa"},"11":{"body":"如同 libdrm 是 DRM 子系统的抽象那样，libinput 提供了 evdev 用户态的抽象。它负责从内核接收输入设备的输入事件，将其解码为可用的形式，并传递给 Wayland 混成器。混成器需要特殊的权限才能使用 evdev 设备文件，从而迫使 Wayland 客户端通过混成器接收输入事件，这样可以防止键盘被记录等。","breadcrumbs":"介绍 » Wayland 的上层设计 » libinput","id":"11","title":"libinput"},"12":{"body":"用户空间负责初步处理来自内核的新设备，在 /dev 中配置目标设备节点的权限，并将这些更改的信息发送给系统上正在运行的程序。大多数系统使用 udev（或 eudev）。Wayland 混成器使用 udev 枚举输入设备和 GPU，并在出现新设备或者拔出旧设备的时候接收通知。","breadcrumbs":"介绍 » Wayland 的上层设计 » (e)udev","id":"12","title":"(e)udev"},"13":{"body":"XKB（X Keyboard 的缩写）是 Xorg 服务的原始键盘处理子系统。几年前，开发者把它从 Xorg 代码树中提取出来，并做成了一个独立的键盘处理库且不再与 X 有任何实际的联系。Libinput（以及 Wayland 混成器）以扫描码的形式提供键盘事件，其准确含义因键盘而异。xkbcommon 负责将这些扫描到的码转化为有意义的通用键盘符号，如 65 转化为 XKB_KEY_Space。它还包含了一个状态机，该状态机知道在按住 shift 键的同时按下 “1” 会变成 “！”。","breadcrumbs":"介绍 » Wayland 的上层设计 » xkbcommon","id":"13","title":"xkbcommon"},"14":{"body":"这是一个客户端和混成器都使用的简单库，其可以有效的处理像素缓冲区，使用相交的矩形进行数学运算，以及执行其他类似的像素操作任务。","breadcrumbs":"介绍 » Wayland 的上层设计 » pixman","id":"14","title":"pixman"},"15":{"body":"libwayland 是 Wayland 协议最常用的 C 语言实现，它处理许多底层的有线协议。同时也提供了一个从 Wayland 协议定义（XML 文件）生成高级代码的工具。我们将在第 1.3 章以及整本书中详细讨论 libwayland。","breadcrumbs":"介绍 » Wayland 的上层设计 » libwayland","id":"15","title":"libwayland"},"16":{"body":"到目前为止，提到的每个部分在整个 Linux 桌面生态系统中都是一致的。而除此以外还有更多的组件。许多图形应用程序根本不了解 Wayland，而是选择诸如 GTK+、QT、SDL 和 GLFW 之类的库来进行处理。许多混成器选择像 wlroots 这样的软件来抽象它们所负责的部分，而其它的一类混成器则在内部实现所有功能。","breadcrumbs":"介绍 » Wayland 的上层设计 » 其他","id":"16","title":"其他"},"2":{"body":"本书采用 mdbook 构建，译者翻译水平有限，疑问请自寻原书解答，许可同源。 自译项目地址： repo 原书： https://wayland-book.com 许可： Creative Commons Attribution-ShareAlike 4.0 International License 源码： repo","breadcrumbs":"介绍 » 关于这本书","id":"2","title":"关于这本书"},"3":{"body":"用 Drew 紧密合作者 Preston Carpenter 的话来说： Drew DeVault 从 sway （一个对广受欢迎的平铺式窗口管理器 i3wm 的克隆） 开启了自己的 Wayland 之路。 目前它俨然成为 Wayland 下最受欢迎的平铺式窗口管理器，无论是用户、提交数量还是影响力。随着它的成功，Drew 回到 Wayland 社区并开始 wlroots 的工作：一个用于构建 Wayland 混成器的灵活可组合的模块。如今它已经成为数十个混成器的基础，并且在 Wayland 领域 Drew 成为最重要的专家之一。","breadcrumbs":"介绍 » 关于作者","id":"3","title":"关于作者"},"4":{"body":"你的电脑有输入和输出设备，它们各自负责接收你的信息并将其显示给你。输入设备例如： 键盘 麦克风 触摸板 触摸屏 数位板 而输出设备通常是桌面上的显示器、笔记本或其他移动设备的屏幕。这些显示资源在你的应用程序之间共用，而 Wayland 混成器在其中起到给客户端分派输入事件并在合适位置显示程序窗口的作用。将所有应用程序窗口组合在一起显示在屏幕上的过程被称为“混成”，因此我们将执行此操作的软件称作混成器。","breadcrumbs":"介绍 » Wayland 的上层设计 » Wayland 的上层设计","id":"4","title":"Wayland 的上层设计"},"5":{"body":"有许多不同的软件组成了桌面生态系统。诸如用于渲染的 Mesa 及其，Linux KMS/DRM 子系统，负责缓存分配的 GBM (Generic Buffer Management 通用缓冲区管理)，用户空间库 libdrm, libinput, evdev 等。但是不用担心，理解 Wayland 几乎不需要具备这些体系的专业知识，并且这些内容都大大超出了本书范围。事实上，Wayland 协议是相当保守和抽象的，很容易就能构建出一个基于 Wayland 的桌面并且大多数软件无需额外实现什么就能运行。话虽如此，但从表面上理解这些部分是什么，以及它们是如何工作，仍是十分有用的。让我们自底向上逐步展开。","breadcrumbs":"介绍 » Wayland 的上层设计 » 现实情况","id":"5","title":"现实情况"},"6":{"body":"一台典型的计算机配备了一些重要的硬件。在机箱外面，我们还有显示器、键盘、鼠标，或许还有麦克风和一个可爱的 USB 保温杯。机箱内部有一系列与这些设备接口相连的组件。例如可能你的键盘和鼠标正在使用由系统专有控制器负责的 USB 接口，你的显示器正连接着 GPU。 这些系统有他们自己的任务和状态。例如，GPU 有以显存形式提供的像素缓冲区，并将这些像素扫描输出到显示器上。GPU 还提供经过特调整的处理器，它们虽然在其他方面有所不如，但可以很好地处理高度并行的任务（例如为 1080P 显示器上的 2,073,600 个像素计算正确的颜色）。USB 控制器的工作同样复杂的令人称奇，它要实现枯燥的 USB 规范以接受来自键盘的输入事件，或精心调控杯垫的温度，从而避免诉讼和让你感到不快的冷咖啡。 在这个层面上，硬件几乎不了解系统上正在运行哪些应用程序。硬件提供了执行工作的命令接口，并告知相应的操作——而不在乎是谁发出的。因此，只允许一个组件与之对话......","breadcrumbs":"介绍 » Wayland 的上层设计 » 硬件部分","id":"6","title":"硬件部分"},"7":{"body":"这一责任落到了内核身上。内核是一头复杂的“野兽”，因此我们只关注与 Wayland 相关的部分。Linux 内核的任务是提供一个抽象的硬件，因此可以在用户态安全的访问它们，我们的 Wayland 混成器也同样运行在用户态。对于图形（称为 DRM 或直接渲染管理器 direct rendering manager）来说，可以在用户态有效地为 GPU 分配任务。DRM 另一个重要的子系统是 KMS（kernel mode setting），其用于枚举显示设备并为其设置属性，例如其选定的分辨率（也称为“模式”）。输入设备通过名为 evdev 的接口进行抽象。 大多数内核接口都可以以特殊的设备文件形式存在于 /dev 供用户态调用。以 DRM 为例，这些文件位于 /dev/dri/ 中，通常以主要节点 primary node（例如 card0）的形式进行特权操作（如模式设置），且以渲染节点 render node（如 renderD128）的形式进行非特权操作（如渲染或视频解码），而对于设备节点 device nodes 则为 /dev/input/event* $ ls /dev/dri/\nby-path card0 renderD128","breadcrumbs":"介绍 » Wayland 的上层设计 » 内核部分","id":"7","title":"内核部分"},"8":{"body":"现在我们来看用户态。在这里，应用程序于硬件隔离，必须通过内核提供的设备节点才能运行。","breadcrumbs":"介绍 » Wayland 的上层设计 » 用户态","id":"8","title":"用户态"},"9":{"body":"大多数 Linux 内核接口都有一个对应的用户态，它为使用这些设备节点提供了令人满意的 C 语言 API。libdrm 库是其中之一，它是 DRM 子系统的用户态部分。Wayland 混成器使用它进行模式设置和其他 DRM 操作，但 Wayland 客户端通常不直接使用 libdrm。","breadcrumbs":"介绍 » Wayland 的上层设计 » libdrm","id":"9","title":"libdrm"}},"length":17,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"1":{".":{"3":{"df":1,"docs":{"15":{"tf":1.0}}},"df":0,"docs":{}},"0":{"8":{"0":{"df":0,"docs":{},"p":{"df":1,"docs":{"6":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"13":{"tf":1.0}}},"2":{",":{"0":{"7":{"3":{",":{"6":{"0":{"0":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},".":{"4":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"4":{".":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"6":{"5":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}},"a":{"d":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{},"p":{"df":0,"docs":{},"i":{"df":0,"docs":{},"。":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"b":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"9":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}}}},"v":{"df":0,"docs":{},"o":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}}},"b":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"0":{"tf":1.0}}}}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{".":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"u":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":2,"docs":{"10":{"tf":1.0},"5":{"tf":1.0}}}}}}}},"c":{"a":{"df":0,"docs":{},"r":{"d":{"0":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"df":2,"docs":{"15":{"tf":1.0},"9":{"tf":1.0}},"h":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"df":0,"docs":{}},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"n":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"v":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"t":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"v":{"/":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"/":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"7":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}},"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"df":2,"docs":{"12":{"tf":1.0},"7":{"tf":1.0}},"i":{"c":{"df":1,"docs":{"7":{"tf":1.0}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"7":{"tf":1.0}}}},"df":0,"docs":{}}}},"m":{"a":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"f":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"w":{"df":1,"docs":{"3":{"tf":2.0}}}},"m":{"df":3,"docs":{"11":{"tf":1.0},"7":{"tf":1.7320508075688772},"9":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"e":{")":{"df":0,"docs":{},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"12":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"b":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":0,"docs":{},"）":{"df":0,"docs":{},"。":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"12":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}},"v":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":3,"docs":{"11":{"tf":1.4142135623730951},"5":{"tf":1.0},"7":{"tf":1.0}}}}},"df":0,"docs":{}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"g":{"b":{"df":0,"docs":{},"m":{"df":2,"docs":{"10":{"tf":1.0},"5":{"tf":1.0}},"（":{"df":0,"docs":{},"g":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"10":{"tf":1.0}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"f":{"df":0,"docs":{},"w":{"df":1,"docs":{"16":{"tf":1.0}}}}},"p":{"df":0,"docs":{},"u":{"df":4,"docs":{"10":{"tf":1.0},"12":{"tf":1.0},"6":{"tf":1.7320508075688772},"7":{"tf":1.0}}}},"t":{"df":0,"docs":{},"k":{"+":{"df":0,"docs":{},"、":{"df":0,"docs":{},"q":{"df":0,"docs":{},"t":{"df":0,"docs":{},"、":{"df":0,"docs":{},"s":{"d":{"df":0,"docs":{},"l":{"df":1,"docs":{"16":{"tf":1.0}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"p":{"df":0,"docs":{},"s":{":":{"/":{"/":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"i":{"3":{"df":0,"docs":{},"w":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"a":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"a":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}},"r":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"b":{"df":0,"docs":{},"o":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"m":{"df":0,"docs":{},"s":{"/":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"5":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{},"（":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":1,"docs":{"7":{"tf":1.0}}}}}}}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":4,"docs":{"10":{"tf":1.0},"11":{"tf":1.0},"5":{"tf":1.0},"9":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":3,"docs":{"11":{"tf":1.4142135623730951},"13":{"tf":1.0},"5":{"tf":1.0}}}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"15":{"tf":1.7320508075688772}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"x":{"df":6,"docs":{"1":{"tf":1.0},"10":{"tf":1.4142135623730951},"16":{"tf":1.0},"5":{"tf":1.0},"7":{"tf":1.0},"9":{"tf":1.0}}}}}},"s":{"df":1,"docs":{"7":{"tf":1.0}}}},"m":{"a":{"df":0,"docs":{},"n":{"a":{"df":0,"docs":{},"g":{"df":3,"docs":{"10":{"tf":1.0},"5":{"tf":1.0},"7":{"tf":1.0}}}},"df":0,"docs":{}}},"d":{"b":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"a":{"df":3,"docs":{"1":{"tf":1.0},"10":{"tf":1.7320508075688772},"5":{"tf":1.0}}},"df":0,"docs":{}}},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"7":{"tf":1.0}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"n":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"7":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":1,"docs":{"10":{"tf":1.7320508075688772}}}}}}}},"p":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"7":{"tf":1.0}}}}},"d":{"df":0,"docs":{},"f":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"14":{"tf":1.0}}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"i":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"7":{"tf":1.0}}}}},"df":0,"docs":{}}}}},"r":{"a":{"c":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"d":{"1":{"2":{"8":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"7":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}},"p":{"df":0,"docs":{},"o":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}}},"w":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"t":{"df":1,"docs":{"7":{"tf":1.0}}}},"h":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"13":{"tf":1.0}}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"o":{"d":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"12":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":1,"docs":{"0":{"tf":1.4142135623730951}}}}},"s":{"b":{"df":1,"docs":{"6":{"tf":2.0}}},"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"v":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"k":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"10":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":11,"docs":{"0":{"tf":2.449489742783178},"10":{"tf":1.0},"11":{"tf":1.4142135623730951},"13":{"tf":1.0},"15":{"tf":1.4142135623730951},"16":{"tf":1.0},"3":{"tf":2.23606797749979},"4":{"tf":1.4142135623730951},"5":{"tf":1.7320508075688772},"7":{"tf":1.4142135623730951},"9":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{},"l":{"_":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"t":{"df":2,"docs":{"16":{"tf":1.0},"3":{"tf":1.0}}}}}}}},"x":{"1":{"1":{"df":1,"docs":{"0":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"13":{"tf":1.0}},"k":{"b":{"_":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"_":{"df":0,"docs":{},"s":{"df":0,"docs":{},"p":{"a":{"c":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"13":{"tf":1.4142135623730951}}}}}}}},"df":0,"docs":{},"（":{"df":0,"docs":{},"x":{"df":1,"docs":{"13":{"tf":1.0}}}}},"df":0,"docs":{}},"m":{"df":0,"docs":{},"l":{"df":1,"docs":{"15":{"tf":1.0}}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":2,"docs":{"0":{"tf":1.0},"13":{"tf":1.4142135623730951}}}}}}}},"breadcrumbs":{"root":{"1":{".":{"3":{"df":1,"docs":{"15":{"tf":1.0}}},"df":0,"docs":{}},"0":{"8":{"0":{"df":0,"docs":{},"p":{"df":1,"docs":{"6":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"13":{"tf":1.0}}},"2":{",":{"0":{"7":{"3":{",":{"6":{"0":{"0":{"df":1,"docs":{"6":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},".":{"4":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"4":{".":{"0":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}},"6":{"5":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}},"a":{"d":{"d":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{},"p":{"df":0,"docs":{},"i":{"df":0,"docs":{},"。":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"b":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"9":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}}},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}}}}},"v":{"df":0,"docs":{},"o":{"df":0,"docs":{},"i":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}}},"b":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"0":{"tf":1.0}}}}}}},"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{".":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":1,"docs":{"2":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"u":{"df":0,"docs":{},"f":{"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":2,"docs":{"10":{"tf":1.0},"5":{"tf":1.0}}}}}}}},"c":{"a":{"df":0,"docs":{},"r":{"d":{"0":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}}}},"df":2,"docs":{"15":{"tf":1.0},"9":{"tf":1.0}},"h":{"a":{"df":0,"docs":{},"p":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"df":0,"docs":{}},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"n":{"d":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}}},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"v":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"t":{"a":{"df":0,"docs":{},"i":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"v":{"/":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"/":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"7":{"tf":1.0}}}}},"df":0,"docs":{}}}}}}},"a":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"t":{"df":1,"docs":{"3":{"tf":1.0}}}}}},"df":2,"docs":{"12":{"tf":1.0},"7":{"tf":1.0}},"i":{"c":{"df":1,"docs":{"7":{"tf":1.0}}},"df":0,"docs":{}}}},"i":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"7":{"tf":1.0}}}},"df":0,"docs":{}}}},"m":{"a":{"b":{"df":0,"docs":{},"u":{"df":0,"docs":{},"f":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"w":{"df":1,"docs":{"3":{"tf":2.0}}}},"m":{"df":3,"docs":{"11":{"tf":1.0},"7":{"tf":1.7320508075688772},"9":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"e":{")":{"df":0,"docs":{},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"12":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"b":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":0,"docs":{},"）":{"df":0,"docs":{},"。":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"12":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}},"v":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":3,"docs":{"11":{"tf":1.4142135623730951},"5":{"tf":1.0},"7":{"tf":1.0}}}}},"df":0,"docs":{}},"x":{"a":{"df":0,"docs":{},"m":{"df":0,"docs":{},"p":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"g":{"b":{"df":0,"docs":{},"m":{"df":2,"docs":{"10":{"tf":1.0},"5":{"tf":1.0}},"（":{"df":0,"docs":{},"g":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"10":{"tf":1.0}}}}}}}}}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":1,"docs":{"5":{"tf":1.0}}}}}},"l":{"df":0,"docs":{},"f":{"df":0,"docs":{},"w":{"df":1,"docs":{"16":{"tf":1.0}}}}},"p":{"df":0,"docs":{},"u":{"df":4,"docs":{"10":{"tf":1.0},"12":{"tf":1.0},"6":{"tf":1.7320508075688772},"7":{"tf":1.0}}}},"t":{"df":0,"docs":{},"k":{"+":{"df":0,"docs":{},"、":{"df":0,"docs":{},"q":{"df":0,"docs":{},"t":{"df":0,"docs":{},"、":{"df":0,"docs":{},"s":{"d":{"df":0,"docs":{},"l":{"df":1,"docs":{"16":{"tf":1.0}}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}}},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"p":{"df":0,"docs":{},"s":{":":{"/":{"/":{"df":0,"docs":{},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"2":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"i":{"3":{"df":0,"docs":{},"w":{"df":0,"docs":{},"m":{"df":1,"docs":{"3":{"tf":1.0}}}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"a":{"d":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"a":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"n":{"df":1,"docs":{"2":{"tf":1.0}}}}},"r":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"u":{"c":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"b":{"df":0,"docs":{},"o":{"a":{"df":0,"docs":{},"r":{"d":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"m":{"df":0,"docs":{},"s":{"/":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"5":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{},"（":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"n":{"df":0,"docs":{},"e":{"df":0,"docs":{},"l":{"df":1,"docs":{"7":{"tf":1.0}}}}}}}}}}}},"l":{"df":0,"docs":{},"i":{"b":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":4,"docs":{"10":{"tf":1.0},"11":{"tf":1.0},"5":{"tf":1.0},"9":{"tf":1.7320508075688772}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":3,"docs":{"11":{"tf":1.7320508075688772},"13":{"tf":1.0},"5":{"tf":1.0}}}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"15":{"tf":2.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"c":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}}}},"n":{"df":0,"docs":{},"u":{"df":0,"docs":{},"x":{"df":6,"docs":{"1":{"tf":1.0},"10":{"tf":1.4142135623730951},"16":{"tf":1.0},"5":{"tf":1.0},"7":{"tf":1.0},"9":{"tf":1.0}}}}}},"s":{"df":1,"docs":{"7":{"tf":1.0}}}},"m":{"a":{"df":0,"docs":{},"n":{"a":{"df":0,"docs":{},"g":{"df":3,"docs":{"10":{"tf":1.0},"5":{"tf":1.0},"7":{"tf":1.0}}}},"df":0,"docs":{}}},"d":{"b":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"a":{"df":3,"docs":{"1":{"tf":1.0},"10":{"tf":2.0},"5":{"tf":1.0}}},"df":0,"docs":{}}},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"7":{"tf":1.0}}}},"df":0,"docs":{},"v":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}}}},"n":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"e":{"df":1,"docs":{"7":{"tf":1.7320508075688772}}}},"df":0,"docs":{},"t":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}}}},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"g":{"df":0,"docs":{},"l":{"df":1,"docs":{"10":{"tf":1.7320508075688772}}}}}}}},"p":{"a":{"df":0,"docs":{},"t":{"df":0,"docs":{},"h":{"df":1,"docs":{"7":{"tf":1.0}}}}},"d":{"df":0,"docs":{},"f":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"14":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"p":{"a":{"df":0,"docs":{},"r":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"s":{"df":0,"docs":{},"t":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"3":{"tf":1.0}}}}}}},"i":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":1,"docs":{"7":{"tf":1.0}}}}},"df":0,"docs":{}}}}},"r":{"a":{"c":{"df":0,"docs":{},"e":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}},"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"d":{"1":{"2":{"8":{"df":1,"docs":{"7":{"tf":1.4142135623730951}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":1,"docs":{"7":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}},"p":{"df":0,"docs":{},"o":{"df":1,"docs":{"2":{"tf":1.4142135623730951}}}},"s":{"df":0,"docs":{},"o":{"df":0,"docs":{},"u":{"df":0,"docs":{},"r":{"c":{"df":1,"docs":{"1":{"tf":1.0}}},"df":0,"docs":{}}}}},"w":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"i":{"a":{"df":0,"docs":{},"l":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"t":{"df":1,"docs":{"7":{"tf":1.0}}}},"h":{"a":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"a":{"df":0,"docs":{},"l":{"df":0,"docs":{},"i":{"df":0,"docs":{},"k":{"df":1,"docs":{"2":{"tf":1.0}}}}}},"df":0,"docs":{}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"f":{"df":0,"docs":{},"t":{"df":1,"docs":{"13":{"tf":1.0}}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":1,"docs":{"3":{"tf":1.0}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"e":{"df":0,"docs":{},"x":{"df":0,"docs":{},"t":{"df":1,"docs":{"1":{"tf":1.0}}}}},"o":{"d":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"12":{"tf":1.4142135623730951}}}}},"df":0,"docs":{},"n":{"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":1,"docs":{"0":{"tf":1.4142135623730951}}}}},"s":{"b":{"df":1,"docs":{"6":{"tf":2.0}}},"df":1,"docs":{"1":{"tf":1.4142135623730951}}}},"v":{"df":0,"docs":{},"u":{"df":0,"docs":{},"l":{"df":0,"docs":{},"k":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"10":{"tf":1.4142135623730951}}}},"df":0,"docs":{}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":15,"docs":{"0":{"tf":2.449489742783178},"10":{"tf":1.4142135623730951},"11":{"tf":1.7320508075688772},"12":{"tf":1.0},"13":{"tf":1.4142135623730951},"14":{"tf":1.0},"15":{"tf":1.7320508075688772},"16":{"tf":1.4142135623730951},"3":{"tf":2.23606797749979},"4":{"tf":2.0},"5":{"tf":2.0},"6":{"tf":1.0},"7":{"tf":1.7320508075688772},"8":{"tf":1.0},"9":{"tf":1.7320508075688772}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{},"l":{"_":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"1":{"tf":1.0}}}}},"df":0,"docs":{}},"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"t":{"df":2,"docs":{"16":{"tf":1.0},"3":{"tf":1.0}}}}}}}},"x":{"1":{"1":{"df":1,"docs":{"0":{"tf":1.0}}},"df":0,"docs":{}},"df":1,"docs":{"13":{"tf":1.0}},"k":{"b":{"_":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"y":{"_":{"df":0,"docs":{},"s":{"df":0,"docs":{},"p":{"a":{"c":{"df":1,"docs":{"13":{"tf":1.0}}},"df":0,"docs":{}},"df":0,"docs":{}}}},"df":0,"docs":{}}}}},"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"13":{"tf":1.7320508075688772}}}}}}}},"df":0,"docs":{},"（":{"df":0,"docs":{},"x":{"df":1,"docs":{"13":{"tf":1.0}}}}},"df":0,"docs":{}},"m":{"df":0,"docs":{},"l":{"df":1,"docs":{"15":{"tf":1.0}}}},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"df":2,"docs":{"0":{"tf":1.0},"13":{"tf":1.4142135623730951}}}}}}}},"title":{"root":{"df":0,"docs":{},"e":{")":{"df":0,"docs":{},"u":{"d":{"df":0,"docs":{},"e":{"df":0,"docs":{},"v":{"df":1,"docs":{"12":{"tf":1.0}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"l":{"df":0,"docs":{},"i":{"b":{"d":{"df":0,"docs":{},"r":{"df":0,"docs":{},"m":{"df":1,"docs":{"9":{"tf":1.0}}}}},"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"p":{"df":0,"docs":{},"u":{"df":0,"docs":{},"t":{"df":1,"docs":{"11":{"tf":1.0}}}}}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"15":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}}},"df":0,"docs":{}}},"m":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"a":{"df":1,"docs":{"10":{"tf":1.0}}},"df":0,"docs":{}}}},"p":{"df":0,"docs":{},"i":{"df":0,"docs":{},"x":{"df":0,"docs":{},"m":{"a":{"df":0,"docs":{},"n":{"df":1,"docs":{"14":{"tf":1.0}}}},"df":0,"docs":{}}}}},"t":{"df":0,"docs":{},"o":{"d":{"df":0,"docs":{},"o":{"df":1,"docs":{"1":{"tf":1.0}}}},"df":0,"docs":{}}},"w":{"a":{"df":0,"docs":{},"y":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"n":{"d":{"df":1,"docs":{"4":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}},"df":0,"docs":{}},"x":{"df":0,"docs":{},"k":{"b":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"m":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":1,"docs":{"13":{"tf":1.0}}}}}}}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":15,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});