import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'imageselectdialog.dart';
import 'store.dart';
import 'classes.dart';
import 'button.dart';

class ProfileSlide extends StatefulWidget {
  @override
  _ProfileSlideState createState() => _ProfileSlideState();
}

class _ProfileSlideState extends State<ProfileSlide> with TickerProviderStateMixin {
  static const double _padding = 64;
  static const double _buttonOffsetFactor = .4;
  static const double _buttonHeight = 100;
  static const Duration _buttonDuration = Duration(milliseconds: 200);

  int _imageIndex = 0;
  List<AssetImage> _imageCache;

  @override
  void didChangeDependencies() {
    _imageCache = Provider.of<Store>(context).images.map((e) => AssetImage(e.src)).toList();
  }

  @override
  Widget build(BuildContext context) {
    ThemeData theme = Theme.of(context);
    final size = MediaQuery.of(context).size;

    final BorderSide _grayBorder = BorderSide(color: theme.buttonColor, width: 4);

    return Column(
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
                      // Display a message if _imageIndex will cause an ArrayOutOfBoundsException
                      child: _mainImageWidget(context, store),
                      onTap: () => _showImageDialog(context, store),
                    ),
                  ),
                  SizedBox(height: 16), // Padding

                  // Display message if Store's profile index is out of bounds
                  if (store.isInitialized && store.isIndexValid) ...[
                    Text(
                      store.name,
                      style: theme.textTheme.headline2,
                    ),
                  ] else if (store.isInitialized) ...[
                    Text(
                      'No profiles are available',
                      style: theme.textTheme.subtitle1,
                    )
                  ] else ...[
                    Text(
                      'Loading...',
                      style: theme.textTheme.subtitle1,
                    )
                  ]
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
        _profileSelectButtons(context),
      ],
    );
  }

  Widget _profileSelectButtons(BuildContext context) {
    var store = Provider.of<Store>(context);

    return Container(
      height: _padding,
      padding: const EdgeInsets.all(16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: <Widget>[
          IconButton(
            icon: Icon(
              Icons.chevron_left,
              color: Theme.of(context).buttonColor,
            ),
            onPressed: () {
              store.index--;
              setState(() => _imageIndex = 0);
            },
          ),
          IconButton(
              icon: Icon(
                Icons.chevron_right,
                color: Theme.of(context).buttonColor,
              ),
              onPressed: () {
                store.index++;
                setState(() => _imageIndex = 0);
              }),
        ],
      ),
    );
  }

  Widget _mainImageWidget(BuildContext context, Store store) {
    if (_imageCache.length <= _imageIndex || _imageIndex < 0)
      return Center(
        child: Text(
          "No images are available",
          style: Theme.of(context).textTheme.bodyText1,
        ),
      );
    else
      return Image(
        image: _imageCache[_imageIndex],
        fit: BoxFit.cover,
      );
  }

  void _showImageDialog(BuildContext context, Store store) {
    showDialog(
      context: context,
      builder: (context) => ImageSelectDialog(
        images: store.images,
        imageCache: _imageCache,
        onTap: (_, index) => setState(() => _imageIndex = index),
      ),
    );
  }
}
