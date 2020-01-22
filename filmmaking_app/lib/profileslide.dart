import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'store.dart';
import 'button.dart';

class ProfileSlide extends StatefulWidget {
  @override
  _ProfileSlideState createState() => _ProfileSlideState();
}

class _ProfileSlideState extends State<ProfileSlide>
    with TickerProviderStateMixin {
  static const double _buttonOffset = 150;
  static const double _buttonHeight = 100;
  static const Duration _buttonDuration = Duration(milliseconds: 200);

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);

    final BorderSide _grayBorder = BorderSide(color: theme.cardColor, width: 4);

    return ChangeNotifierProvider(
      create: (context) => Store(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Flexible(
            flex: 1,
            child: Padding(
              padding: const EdgeInsets.only(
                top: 64,
                left: 64,
              ),
              child: Consumer<Store>(
                builder: (context, store, _) => Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    Expanded(
                      child: Image.asset(
                        store.image,
                        fit: BoxFit.cover,
                      ),
                    ),
                    SizedBox(height: 16),
                    Text(
                      store.name,
                      style: theme.textTheme.title,
                    ),
                  ],
                ),
              ),
            ),
          ),
          SizedBox(height: 32),
          LikeButton(
            vsync: this,
            activeMode: Mode.Like,
            duration: _buttonDuration,
            height: _buttonHeight,
            width: _buttonOffset,
            semanticLabel: "Like",
            enabledColor: theme.indicatorColor,
            alignment: Alignment.centerRight,
            enabledIcon: 'ic_heart_white',
            disabledIcon: 'ic_heart_gray',
            border: Border(
              top: _grayBorder,
              bottom: _grayBorder,
              right: _grayBorder,
            ),
          ),
          Padding(
            padding: const EdgeInsets.only(
              left: _buttonOffset, bottom: 64, // Page bottom padding
            ),
            child: LikeButton(
              vsync: this,
              activeMode: Mode.Dislike,
              duration: _buttonDuration,
              height: _buttonHeight,
              semanticLabel: "Dislike",
              enabledColor: theme.errorColor,
              alignment: Alignment.centerLeft,
              enabledIcon: 'ic_heart_dislike_white',
              disabledIcon: 'ic_heart_dislike_gray',
              border: Border(
                top: _grayBorder,
                left: _grayBorder,
                bottom: _grayBorder,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
