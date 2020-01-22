import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:provider/provider.dart';
import 'store.dart';

class LikeButton extends StatefulWidget {
  final String enabledIcon;
  final String disabledIcon;
  final Color enabledColor;
  final Duration duration;
  final double width;
  final double height;
  final String semanticLabel;
  final Border border;
  final AlignmentGeometry alignment;
  final Mode activeMode;
  final TickerProvider vsync;

  LikeButton({
    Key key,
    this.enabledIcon,
    this.disabledIcon,
    this.enabledColor,
    this.duration,
    this.width,
    this.height,
    this.semanticLabel,
    this.border,
    this.alignment,
    @required this.activeMode,
    @required this.vsync,
  }) : super(key: key);

  _LikeButtonState createState() => _LikeButtonState();
}

class _LikeButtonState extends State<LikeButton> {
  Widget build(BuildContext context) {
    final _controller = AnimationController(
      vsync: widget.vsync,
      duration: widget.duration,
    );
    final _animation = Tween(begin: 0.0, end: 1.0).animate(_controller);

    _controller.forward();

    return SizedBox(
      width: widget.width,
      height: widget.height,
      child: Semantics(
        button: true,
        label: widget.semanticLabel,
        child: Consumer<Store>(
          builder: (context, store, _) => FlatButton(
            splashColor: widget.enabledColor,
            onPressed: () {
              store.likeMode = store.likeMode == widget.activeMode
                  ? Mode.None
                  : widget.activeMode;
              _controller.forward();
            },
            padding: const EdgeInsets.all(0),
            child: AnimatedContainer(
              duration: widget.duration,
              alignment: widget.alignment,
              decoration: store.likeMode == widget.activeMode
                  ? BoxDecoration(color: widget.enabledColor)
                  : BoxDecoration(
                      color: Colors.transparent,
                      border: widget.border,
                    ),
              child: AspectRatio(
                aspectRatio: 1,
                child: Center(
                  child: FadeTransition(
                    opacity: _animation,
                    child: SvgPicture.asset(
                      'assets/vectors/${store.likeMode == widget.activeMode ? widget.enabledIcon : widget.disabledIcon}.svg',
                      width: 64,
                      height: 64,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
