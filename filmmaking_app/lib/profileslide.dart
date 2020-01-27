import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'imageselectdialog.dart';
import 'store.dart';
import 'button.dart';

class ProfileSlide extends StatefulWidget {
  @override
  _ProfileSlideState createState() => _ProfileSlideState();
}

class _ProfileSlideState extends State<ProfileSlide>
    with TickerProviderStateMixin {
  static const double _padding = 64;
  static const double _buttonOffsetFactor = .4;
  static const double _buttonHeight = 100;
  static const Duration _buttonDuration = Duration(milliseconds: 200);

  int _imageIndex = 0;

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    final BorderSide _grayBorder =
        BorderSide(color: theme.buttonColor, width: 4);

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
                      child: GestureDetector(
                        child: Image.asset(
                          store.images[_imageIndex].src,
                          fit: BoxFit.cover,
                        ),
                        onTap: () => _showImageDialog(context, store),
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
            width: size.width * _buttonOffsetFactor,
            semanticLabel: "Like",
            enabledColor: theme.indicatorColor,
            alignment: Alignment.centerRight,
            enabledIcon: 'anim_heart',
            border: Border(
              top: _grayBorder,
              bottom: _grayBorder,
              right: _grayBorder,
            ),
          ),
          Align(
            alignment: Alignment.centerRight,
            child: LikeButton(
              vsync: this,
              activeMode: Mode.Dislike,
              duration: _buttonDuration,
              width: size.width * (1 - _buttonOffsetFactor),
              height: _buttonHeight,
              semanticLabel: "Dislike",
              enabledColor: theme.errorColor,
              alignment: Alignment.centerLeft,
              enabledIcon: 'anim_heart_dislike',
              border: Border(
                top: _grayBorder,
                left: _grayBorder,
                bottom: _grayBorder,
              ),
            ),
          ),
          SizedBox(height: _padding),
        ],
      ),
    );
  }

  void _showImageDialog(BuildContext context, Store store) {
    showDialog(
      context: context,
      builder: (context) => ImageSelectDialog(
        images: store.images,
        onTap: (_, index) => setState(() => _imageIndex = index),
      ),
    );
  }
}
