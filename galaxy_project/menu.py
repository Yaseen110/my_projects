from kivy.uix.relativelayout import RelativeLayout
class MenuWidget(RelativeLayout):
    def on_touch_down(self, touch):
        if self.opacity==0:
            return False
            # if the menu is noot visible we ignore the touch or we transmit the touch
        return super(RelativeLayout,self).on_touch_down(touch)