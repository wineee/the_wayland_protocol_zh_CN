# 资源与代理

对象是客户端和服务端达成共识的实体，它具有一些状态，可以通过 Wire 协议更改。
在客户端，libwayland 通过 wl_proxy 接口引用这些对象。
这些接口对 C 语言友好，它们是抽象对象的具体代理，提供了客户端会间接使用的函数，用于 Wayland 消息的序列化。
查看 wayland-client-core.h 头文件，您会发现为实现该目的的一些底层函数。
它们通常不会被直接使用。

> ```shell
> # 查找该文件位置
> $ find /usr/include -name wayland-client-core.h
> ```

在服务端，对象通过 wl_resource 进行抽象，这点与客户端非常相似，不过有一点更复杂——服务端必须知晓哪个对象属于哪个客户端。
每个 wl_resource 都归单独的某一客户端所有，除此之外，接口大致相同，也有提供把事件发送给客户端的底层抽象。
在服务端上直接使用 wl_resource 的频次将比客户端直接使用 wl_proxy 更高。
这种用法的一个例子是获取对某资源的 wl_client 引用，或者在客户端尝试无效操作的时候发送协议错误。

此外还有另一组高级接口，大多数 Wayland 客户端和服务端的代码都与之交互以完成其大部分任务。
