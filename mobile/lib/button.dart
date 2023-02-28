import 'package:flare_flutter/flare_actor.dart';
// import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'store.dart';
import 'classes.dart';

class LikeButton extends StatelessWidget {
  final String enabledIcon;
//   final String disabledIcon;
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
    // this.disabledIcon,
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

  Widget build(BuildContext context) {
    return SizedBox(
      width: width,
      height: height,
      child: Semantics(
        button: true,
        label: semanticLabel,
        child: Consumer<Store>(
          builder: (context, store, _) => FlatButton(
            splashColor: enabledColor,
            onPressed: () {
              store.mode = store.mode == activeMode ? Mode.None : activeMode;
              //   _controller.forward();
            },
            padding: const EdgeInsets.all(0),
            child: Stack(
              alignment: alignment,
              children: <Widget>[
                AnimatedContainer(
                  duration: duration,
                  decoration: store.mode == activeMode
                      ? BoxDecoration(color: enabledColor)
                      : BoxDecoration(
                          color: Colors.transparent,
                          border: border,
                        ),
                ),
                AspectRatio(
                  aspectRatio: 1,
                  child: Center(
                    child: SizedBox(
                      width: 64,
                      height: 64,
                      child: FlareActor(
                        'assets/vectors/${enabledIcon}.flr',
                        alignment: Alignment.center,
                        fit: BoxFit.contain,
                        animation: store.mode == activeMode ? 'on' : 'off',
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
